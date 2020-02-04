const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// 1. Why we did not pass info object here ? (selection set will not match with modal)
async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)

    // 2
    const user = await context.prisma.mutation.createUser({
        data: {
            ...args,
            password
        }
    })

    // console.log(info)
    // 3
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    // 1
    const user = await context.prisma.query.user({
        where: {
            email: args.email
        }
    })
    if (!user) {
        throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    // 3
    return {
        token,
        user,
    }
}

// 2. Not passing info object will NOT return you the nested fields (returns null)
//  - One way to pass selection set through info to get required result back 
// function post(parent, args, context, info) {
//     const userId = getUserId(context)
//     return context.prisma.mutation.createLink({
//         data: {
//             url: args.url,
//             description: args.description,
//             postedBy: { connect: { id: userId } },
//         }
//     }, info)
// }

//  - Other way is to implement resolver for postedBy
// function post(parent, args, context, info) {
//     const userId = getUserId(context)
//     return context.prisma.mutation.createLink({
//         data: {
//             url: args.url,
//             description: args.description,
//             postedBy: { connect: { id: userId } },
//         }
//     })
// }

// 3. Also you can maintain 2 way connections
async function post(parent, args, context, info) {
    const userId = getUserId(context)
    const link = await context.prisma.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        }
    })

    const user = await context.prisma.mutation.updateUser({
        where: {
            id: userId
        },
        data: {
            links: {
                connect: {
                    id: link.id
                }
            }
        }
    })

    return {
        id: link.id,
        description: link.description,
        url: link.url,
        userId: user.id
    }
}


module.exports = {
    signup,
    login,
    post
}
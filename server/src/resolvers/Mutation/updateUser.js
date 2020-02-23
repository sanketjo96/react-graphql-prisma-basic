const { getUserId } = require('../../utils')
const { userSet } = require('../templates')

async function updateUser(parent, args, context, info) {
    const { name, role, managerId } = args
    const userId = getUserId(context)
    const user = await context.prisma.mutation.updateUser({
        data: {
            name,
            role: {
                update: {
                    name: role
                }
            },
            manager: {
                connect: {
                    id: managerId
                }
            }
        },
        where: {
            id: userId
        }
    }, userSet)

    return user
}

module.exports = updateUser
// 1. Case where user dont have association with link
async function postedBy(parent, args, context, info) {
    const link = await context.prisma.query.link({
        where: {
            id: parent.id
        }
    }, `{ postedBy { id, name, email } }`)

    return {
        id: link.postedBy.id,
        name: link.postedBy.name,
        email: link.postedBy.email
    }
}

// 2. Case where user have association with link
// function postedBy(parent, args, context, info) {
//     return context.prisma.query.user({
//         where: {
//             id: parent.userId
//         }
//     }, info)
// }

module.exports = {
    postedBy
}
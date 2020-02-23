const { getUserId } = require('../../utils')
const { userSet } = require('../templates')

function deleteUser(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.mutation.deleteUser({
        where: {
            id: args.userId
        }
    }, userSet)
}

module.exports = deleteUser
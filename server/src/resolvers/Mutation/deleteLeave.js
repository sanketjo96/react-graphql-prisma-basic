const { getUserId } = require('../../utils')
const { leavesSet } = require('../templates')

function deleteLeave(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.mutation.deleteManyLeaves({
        where: {
            id_in: args.leaveIds
        }
    })
}

module.exports = deleteLeave
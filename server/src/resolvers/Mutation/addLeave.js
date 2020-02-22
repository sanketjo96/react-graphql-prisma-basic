const { getUserId } = require('../../utils')

function addLeave(parent, args, context, info) {
    const userId = getUserId(context)

    return context.prisma.query.roles()
}

module.exports = addLeave
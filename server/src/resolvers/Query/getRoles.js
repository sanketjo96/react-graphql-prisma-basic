const { getUserId } = require('../../utils')

function getRoles(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.query.roles()
}

module.exports = getRoles
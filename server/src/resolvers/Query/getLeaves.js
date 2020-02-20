function getLeaves(parent, args, context, info) {
    return context.prisma.query.roles()
}

module.exports = getLeaves
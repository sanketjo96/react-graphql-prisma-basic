function getRoles(parent, args, context, info) {
    return context.prisma.query.roles()
}

module.exports = getRoles
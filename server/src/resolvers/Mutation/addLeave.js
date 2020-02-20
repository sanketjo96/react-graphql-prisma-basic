function addLeave(parent, args, context, info) {
    return context.prisma.query.roles()
}

module.exports = addLeave
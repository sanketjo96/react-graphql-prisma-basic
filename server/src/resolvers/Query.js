function feed(parent, args, context, info) {
    return context.prisma.query.links()
}

module.exports = {
    feed,
}
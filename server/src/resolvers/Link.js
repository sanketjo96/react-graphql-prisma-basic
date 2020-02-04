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

module.exports = {
    postedBy
}
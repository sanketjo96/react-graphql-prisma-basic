function getHolidays(parent, args, context, info) {
    return context.prisma.query.roles()
}

module.exports = getHolidays
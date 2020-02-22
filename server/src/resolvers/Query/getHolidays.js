const { getUserId } = require('../../utils')

function getHolidays(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.query.holidays()
}

module.exports = getHolidays
const { getUserId, isLeaveDatesInValid } = require('../../utils')
const { userSet } = require('../templates')
const moment = require('moment')

function addLeave(parent, args, context, info) {
    const userId = getUserId(context)

    const startDate = moment.utc(args.startDate);
    const endDate = moment.utc(args.endDate);

    if (isLeaveDatesInValid(startDate, endDate)) {
        throw new Error('Invalid date !!')
    }

    return context.prisma.mutation.updateUser({
        data: {
            leavePlans: {
                create: {
                    startDate: startDate.format(),
                    endDate: endDate.format()
                }
            }
        },
        where: {
            id: userId
        }
    }, userSet)
}

module.exports = addLeave
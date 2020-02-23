const { getUserId } = require('../../utils')
const { leavesSet } = require('../templates')

async function getLeaves(parent, args, context, info) {
    const userId = getUserId(context)

    let emails = []
    let where= {
        OR: [
            {
                id: userId
            }
        ]
    }

    // To include leaves of subordinate staff
    if (args.addSub) {
        where.OR.push({
            manager: {
                id: userId
            }
        })
    }

    const requiredUsers = await context.prisma.query.users({
        where
    }, '{email}')

    emails = requiredUsers.map(user => user.email)
    const leaves = await context.prisma.query.leaves({
        where: {
            postedBy: {
                email_in: emails
            }
        }
    }, leavesSet)
    return leaves
}

module.exports = getLeaves
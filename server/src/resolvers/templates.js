const leavesSet = `
    {
        id
        startDate
        endDate
        postedBy {
            name
            email
        }
    }
`

const userSet = `
    {
        id
        name
        email
        manager {
            id
            name
            email
        }
        leavePlans {
            id
            startDate
            endDate
        }
    }
`

module.exports = {
    leavesSet,
    userSet
}
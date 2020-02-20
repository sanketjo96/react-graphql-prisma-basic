async function addUser(parent, args, context, info) {
    const { name, email, password, roleId, managerId } = args

    let data = {
        name,
        email,
        password,
        role: {
            connect: {
                id: roleId
            }
        }
    }

    if (managerId) {
        data = {
            ...data,
            manager: {
                connect: {
                    id: managerId
                }
            }
        }
    }

    const user = await context.prisma.mutation.createUser({
        data
    })

    return user
}

module.exports = addUser
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./src/resolvers/Query/index')
const Mutation = require('./src/resolvers/Mutation/index')

const resolvers = {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs: 'src/schema/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
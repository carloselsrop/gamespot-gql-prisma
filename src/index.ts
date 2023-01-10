import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http'
import express from 'express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import bodyParser from 'body-parser'
import cors from 'cors'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { User } from '@prisma/client'

const typeDefs = readFileSync('./src/graphql/schema.graphql').toString('utf-8')

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
})
schema = constraintDirective()(schema)

const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
})
const serverCleanup = useServer({ schema }, wsServer)

interface MyContext {
  user: User
}

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

await server.start()
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server)
)

const PORT = 5000
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}/subscriptions`)
})

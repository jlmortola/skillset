import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import http from 'http'
import cookie from 'cookie'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import express from 'express'
import typedefs from './typedefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'



(() => {
  
  try { 
  const app = express()
  dotenv.config()
  const PORT = process.env.PORT
  const db = `mongodb://${process.env.MONGO_DB}`

  app.disable('x-powered-by')
  
  mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.set('useFindAndModify', false);
  
  const validateToken = (token) => {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  } 

  app.use(cors({
    credentials: true,
  }))

  app.use((req, res, next) => {
    const { token } = cookie.parse(req.headers.cookie)
    if (token) req.userId = validateToken(token)
    next()
  })

  const server = new ApolloServer({ 
    typedefs,
    resolvers,
    schemaDirectives,
    playground: true,
    context: ({req, res, connection})=>({req, res, connection}),
    subscriptions: {
      onConnect: (connection, webSocket) => {
        return new Promise(res=>{
          if (webSocket.upgradeReq.headers.cookie) {
            const cookies = cookie.parse(webSocket.upgradeReq.headers.cookie)
            const { token } = cookies
            const userId = validateToken(token)
            if (userId) res({ userId })
          }
        })
      }
    }
  });
  server.applyMiddleware({app}) 

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({port: PORT},() => {
    console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

  } catch (e) {
    console.log(e)
  }


}) ()
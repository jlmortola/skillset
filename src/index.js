import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'


(()=> {
  
  try { const app = express()
  const db = 'mongodb://skillset:skillset1@ds145555.mlab.com:45555/skillset'
  const port = 4000
  app.disable('x-powered-by')
  dotenv.config()
  
  mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.set('useFindAndModify', false);
  
  app.use(cookieParser())
  app.use((req, res, next)=>{
    const { token } = req.cookies
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      req.userId = userId
    }
    next()
  })

  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: true,
    context:({req, res})=>({req, res})
  });
  server.applyMiddleware({app}) 

  // The `listen` method launches a web server.
  app.listen({port: port},() => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  } catch (e) {
    console.log(e)
  }


}) ()
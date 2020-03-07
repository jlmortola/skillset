import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import typeDefs from './schemas'
import resolvers from './resolvers'

(async ()=> {

  try { const app = express()
  const db = 'mongodb://skillset:skillset1@ds145555.mlab.com:45555/skillset'
  const server = new ApolloServer({ typeDefs, resolvers, playground: true });
  const port = 4000
  app.disable('x-powered-by')
  
  
  mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.set('useFindAndModify', false);
  server.applyMiddleware({app})
  
  // The `listen` method launches a web server.
  app.listen({port: port},() => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  } catch (e) {
    console.log(e)
  }


}) ()
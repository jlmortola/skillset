import { AuthenticationError, addResolveFunctionsToSchema, ApolloError } from 'apollo-server-express'

import User from '../models/user'
import {signIn} from '../utils/auth'

export default {
  Query: {
    user: (root, args, ctx, info) => {
      return  User.findOne({_id: args.id})
    },
    users: ( root, args, ctx, info ) => {
      return User.find({})
    }
  },

  Mutation: {
    signUp: (root, args, ctx) => {
      return User.create(args)
    },
    signIn: async (root, {email, password}, ctx) => {
    
      const user = await signIn(email, password)
      return user

    },
    editUser: async(root, args, ctx) => {
      if(!args.id) return
      const user = User.findOneAndUpdate({_id: args.id}, args,  function(err, result) {
        if (err) {
          return new ApolloError('error')
        } else {
          return result
        }
      })
      return user  
    }
  }
}
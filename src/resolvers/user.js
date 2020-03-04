
import User from '../models/user'
import {signIn} from '../utils/auth'

export default {
  Query: {
    user: ( root, args, ctx, info ) => {
      return User.find(args.id)
    },
    users: ( root, args, ctx, info ) => {
      return User.find({})
    }
  },

  Mutation: {
    signUp: ( root, args, ctx ) => {
    console.log("args", args)
      return User.create(args)
    },
    signIn: async (root, {email, password}, ctx) => {
      
      const user = await signIn(email, password)
      return user


    }
  }
}
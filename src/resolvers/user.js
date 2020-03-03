import User from '../models/user'

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
    }
  }
}
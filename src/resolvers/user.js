import { AuthenticationError, ApolloError } from 'apollo-server-express'
import User from '../models/user'
import * as Auth from '../utils/auth'

export default {
  Query: {
    me: async (parent, args, { req, res }, info) => {
      if(!req.userId) return new AuthenticationError('you must signin first')
      const user = await User.findById(req.userId)
      return user
    },
    user: (parent, args, ctx, info) => {
      return  User.findOne({_id: args.id})
    },
    users: ( parent, args, ctx, info ) => {
      return User.find({})
    }
  },

  Mutation: {
    signUp: (parent, args, { req, res }, info) => {
      args.email = args.email.toLowerCase()
      const user = User.create(args)
      Auth.setCookie(user.id, res)
      return user
    },
    signIn: async (parent, { email, password }, { req, res }, info) => {
      const user = await Auth.signIn(email, password, res)
      return user
    },
    signOut: (parent, args, { req, res }, info) => {
      res.clearCookie('token')
      return { message: 'You logged out'}
    },
    editUser: async(parent, args, { req, res }, info) => {
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
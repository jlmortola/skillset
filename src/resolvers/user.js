import { AuthenticationError, ApolloError } from 'apollo-server-express'
import {randomBytes} from 'crypto'
import { promisify } from 'util'

import User from '../models/user'
import * as Auth from '../utils/auth'

export default {
  Query: {
    me: async (parent, args, { req, res }, info) => {
      console.log("req.userId", req.userId)
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
    requestResetPasswordToken: async (parent, {email}, { req, res }, info) => {
      const user = await User.findOne({email})

      if (!user) return new ApolloError('no user found')
      
      const resetToken = (await promisify(randomBytes)(20)).toString('hex')
      const resetTokenExpire = Date.now() + 360000
      await User.findOneAndUpdate({email}, {resetToken, resetTokenExpire})
      return { message: 'token sent'}
    },
    resetPassword: async(parent, {password, token}, {req, res}, info) => {
      const user = await User.findOne({resetToken: token})

      if (!user) return new ApolloError('invalid or expired token')
      if (user.resetTokenExpire < Date.now()) return new ApolloError('invalid or expired token')

      const updatedUser = await User.findOneAndUpdate(
        {resetToken: token}, 
        {password, resetToken: null, resetTokenExpire: null})
      Auth.setCookie(user.id, res)
      return updatedUser

    },
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
      if(!req.userId) return new AuthenticationError('you must signin first')
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
  },
  User: {
    chats: async (user, args, ctx, info) => {
      await user.populate('chats').execPopulate()
      return user.chats
    }
  }
}
import Message from '../models/message'
import User from '../models/user'
import Chat from '../models/chat'
import pubsub from './pubsub'

const NEW_MESSAGE = 'NEW_MESSAGE'
const UPDATE_USER = 'UPDATE_USER'

export default {
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      const chat = await Chat.findById(args.chat)
      const user = await User.findById(req.userId)

      if(!chat) return new Error('Chat not found') 

      const message = await Message.create(args)
      chat.lastMessage = message
      await chat.save()

      pubsub.publish(NEW_MESSAGE, {
        newMessage: message
      })
      pubsub.publish(UPDATE_USER, {
        updateUser: user
      })

      return message
    }
  },
  Message:{
    user: async (message, args, ctx, info) => {
      return await User.findOne({_id: message.user})
    }
  },
  Subscription: {
    newMessage: {
      subscribe: (root, args, { connection: { context }}) => {
        if (!context.userId) return new Error('not auth')

        return pubsub.asyncIterator(NEW_MESSAGE)
      }
    },
    updateUser: {
      subscribe: (root, args) => pubsub.asyncIterator(UPDATE_USER)
    }
  }
}
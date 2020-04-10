import Chat from "../models/chat"
import User from '../models/user'
import Message from '../models/message'

export default {
  Mutation: {
    createChat: async (root, {users}, {res, req}, info) => {

      const idsFound = await User.where('_id').in(users).countDocuments()

      if (idsFound !== users.length) {
        return new Error('not found')
      }

      users.push(req.userId)

      const chatFound = await Chat.find({users: {'$eq': users}})

      if (chatFound) return chatFound[0]

      const chat = await Chat.create({users})

      await User.updateMany({_id:{'$in': users}}, {
        $push: {chats: chat}
      })

      return chat
    }
  },
  Chat: {
    users: async (chat, args, ctx, info) => {
      await chat.populate('users').execPopulate()
      return chat.users
    },
    messages: async (chat, args, ctx, info) => {
      return await Message.find({chat: chat.id})
    },
    lastMessage: async( chat, args, ctx, info) => {
      await chat.populate('lastMessage').execPopulate()
      return chat.lastMessage
      // return (await chat.populate('lastMessage').execPopulate()).lastMessage
    }
  }
}
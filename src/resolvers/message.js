import Message from '../models/message'
import User from '../models/user'
import Chat from '../models/chat'

export default {
  Mutation: {
    sendMessage: async (root, args, ctx, info) => {
      const chatFound = await Chat.findById(args.chat)
      if(!chatFound) return new Error('Chat not found') 

      const msg = await Message.create(args)
      return msg
    }
  },
  Message:{
    user: async (message, args, ctx, info) => {
      return await User.findOne({_id: message.user})
    }
  }
}
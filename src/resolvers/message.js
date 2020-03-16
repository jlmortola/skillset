import Message from '../models/message'
import User from '../models/user'

export default {
  Mutation: {
    sendMessage: async (root, args, ctx, info) => {
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
import Chat from "../models/chat"
import User from '../models/user'

export default {
  Mutation: {
    createChat: async (root, {users}, {res, req}, info) => {

      const idsFound = await User.where('_id').in(users).countDocuments()

      if (idsFound !== users.length) {
        return new Error('not found')
      }

      users.push(req.userId)

      const chat = await Chat.create({users})

      await User.updateMany({_id:{'$in': users}}, {
        $push: {chats: chat}
      })

      return chat
    }
  }
}
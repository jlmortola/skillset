import mongoose, { Schema } from 'mongoose';
const { ObjectId }  = Schema.Types

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: ObjectId,
      ref: 'User',
    }
  ],
  lastMessage: {
    type: ObjectId,
    ref: 'Message',
  }},
  {timestamps: true}
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
import mongoose, { Schema } from 'mongoose';
import User from './user';
import Message from './message';

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
import mongoose, { Schema } from 'mongoose';
import User from './user';
import Chat from './chat';

const { ObjectId }  = Schema.Types

const messageSchema = new mongoose.Schema({
  users: {
    type: ObjectId,
    ref: 'User',
  },
  chat: {
    type: ObjectId,
    ref: 'Chat',
  },
  body: String,
  },
  {timestamps: true}
)

const Message = mongoose.model('Message', messageSchema)

export default Message
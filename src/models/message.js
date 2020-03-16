import mongoose, { Schema } from 'mongoose';

const { ObjectId }  = Schema.Types

const messageSchema = new mongoose.Schema({
  user: {
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
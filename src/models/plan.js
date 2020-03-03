import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  title: String,
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const plan = mongoose.model('plan', planSchema);

export default plan;
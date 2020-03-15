import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server';

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    validate: {
      validator: (email) => User.isUnique({email}),
      message: props => `${props.value} is already registered`
    },
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  }],
  password: String,
  resetToken: String,
  resetTokenExpire: Number,
}, {
  timestamps: true

});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12)
  this.password = hashedPassword
});

userSchema.pre('findOneAndUpdate', function(next) {
  let { email, password, id } = this._update
  
  if (password)  {
    const hashedPassword = bcrypt.hashSync(password, 12)
    password = hashedPassword
    this._update.password = password
  }

  if(!email) next()

  User.findOne({ email }).then((doc) => {
    if(doc && id != doc._id) {
      next(new ApolloError('email already exists'))
    } else {
      next()
    }
  })
})

userSchema.statics.isUnique = async function(option) {
  return await this.where(option).countDocuments() === 0
}

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

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
  password: String,
}, {
  timestamps: true

});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

userSchema.statics.isUnique = async function(option) {
  return await this.where(option).countDocuments() === 0
}

userSchema.methods.matchPassword = async function (password) {
  console.log("bcrypt.compare(password, this.password)", bcrypt.compare(password, this.password))
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
}, {
  timestamps: true

});

userSchema.pre('save', function() {
console.log("function")
  
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  console.log("hashedPassword", hashedPassword)
  this.password = hashedPassword;
});

const User = mongoose.model('User', userSchema);

export default User;
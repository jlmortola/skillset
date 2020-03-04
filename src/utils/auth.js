import { AuthenticationError } from 'apollo-server-express'
import User from '../models/user'

export const signIn = async (email, password) => {
  const errMsg = 'Incorrect email or password'
  const user = await User.findOne({email})

  if (!user) {
    throw new AuthenticationError(errMsg)
  }

  if(!await user.matchPassword(password, user)) {
    throw new AuthenticationError(errMsg)
  }

  return user

}
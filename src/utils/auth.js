import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const signIn = async (email, password, res) => {
  const errMsg = 'Incorrect email or password'
  const user = await User.findOne({email})

  if (!user) {
    throw new AuthenticationError(errMsg)
  }

  if(!await user.matchPassword(password, user)) {
    throw new AuthenticationError(errMsg)
  }

  setCookie(user.id, res)
  return user
}

export const isSignedIn = (req) => req.userId

export const ensureSignedIn = (req) => {
  if(!isSignedIn(req)) throw new AuthenticationError('you must signin first')
}

export const setCookie = (id, res) => {
  const token = jwt.sign({userId: id}, process.env.APP_SECRET)
  res.cookie('token', token, { maxAge: 900000, httpOnly: false })
} 
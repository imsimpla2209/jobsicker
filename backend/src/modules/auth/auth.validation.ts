import Joi from 'joi'
import { password } from '../../providers/validate/custom.validation'
import { NewRegisteredUser } from '../user/user.interfaces'

const registerBody: Record<keyof NewRegisteredUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  avatar: Joi.string(),
  images: Joi.array().items(Joi.string()),
  dob: Joi.date(),
  address: Joi.string(),
  nationalId: Joi.string().required(),
}

export const register = {
  body: Joi.object().keys(registerBody),
}

export const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

export const oAuth = {
  body: Joi.object().keys({
    access_token: Joi.string().required(),
  }),
}

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
}

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
}
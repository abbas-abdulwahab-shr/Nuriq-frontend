import { apiPostClient } from './apiClients'
import type {
  ForgotPasswordData,
  SignInData,
  SignUpData,
} from '@/types/authTypes'

export const customSignUp = (data: SignUpData) => {
  return apiPostClient('/auth/signup', data)
}

export const customLogin = (data: SignInData) => {
  return apiPostClient('/auth/login/email', data)
}

export const federatedLogin = (token: string) => {
  return apiPostClient(`/auth/login/google?token=${token}`)
}

export const requestForgotPassword = (email: string) => {
  return apiPostClient('/auth/request-forgot-password', { email })
}

export const resetPassword = (data: ForgotPasswordData) => {
  return apiPostClient('/auth/forgot-password', data)
}

export const customLogout = () => {
  return apiPostClient('/auth/logout')
}

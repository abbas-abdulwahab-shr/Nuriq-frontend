export interface SignUpData {
  full_name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface ForgotPasswordData {
  email: string
  token: string
  new_password: string
}

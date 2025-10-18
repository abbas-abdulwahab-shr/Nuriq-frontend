import {
  apiDeleteClient,
  apiGetClient,
  apiPostClient,
  apiPutClient,
} from './apiClients'

export const getUserProfile = () => {
  return apiGetClient('/account/me')
}

export const updateUserProfile = (data: {
  full_name: string
  avatar: string
}) => {
  return apiPutClient('/account/me', data)
}

export const deleteUserAccount = () => {
  return apiDeleteClient('/account/me')
}

export const changePasswordFromProfile = (data: {
  old_password: string
  new_password: string
}) => {
  return apiPostClient('/account/me/change-password', data)
}

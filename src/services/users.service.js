import { apiLibrary } from "./index.service"

export const userBorrowed = (borrowedInfo) => {
  return apiLibrary.post('users', borrowedInfo)
}

export const getUsers = () => {
  return apiLibrary.get('users')
}

export const updateUser = (info) => {
  return apiLibrary.patch('users', info)
}

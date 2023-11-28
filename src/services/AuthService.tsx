import { API } from './API'

class AuthService {
  // getAllusers() {
  //   return API.get('/users')
  // }

  createUser(user: any) {
    return API.post('/users', user)
  }

  getUserByEmail(emaiId: string) {
    return API.get(`/users?email=${emaiId}`)
  }

  //   updateUser(userId: number, user: any) {
  //     return API.put(`/users/${userId}`, user)
  //   }

  //   deleteUser(userId: number) {
  //     return API.delete(`/users/${userId}`)
  //   }
}

export default new AuthService()

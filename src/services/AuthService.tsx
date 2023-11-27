import { API } from './API'

class AuthService {
    // getAllEmployees() {
    //   return API.get('/employees')
    // }

  createUser(user: any) {
    return API.post('/users', user)
  }

  getUserByEmail(emaiId: string) {
    return API.get(`/users?email=${emaiId}`)
  }

  //   updateEmployee(employeeId: number, employee: Employee) {
  //     return API.put(`/employees/${employeeId}`, employee)
  //   }

  //   deleteEmployee(employeeId: number) {
  //     return API.delete(`/employees/${employeeId}`)
  //   }
}

export default new AuthService()

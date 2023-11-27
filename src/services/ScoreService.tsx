import { API } from './API'

class ScoreService {
  getAllScores() {
    return API.get('/scores')
  }

  createScores(score: any) {
    return API.post('/scores', score)
  }

  //   getEmployeeById(employeeId: number) {
  //     return API.get(`/employees/${employeeId}`)
  //   }

  //   getEmployeeByEmail(emailId: string) {
  //     return API.get(`/employees?email=${emailId}`)
  //   }

  //   updateEmployee(employeeId: number, employee: Employee) {
  //     return API.put(`/employees/${employeeId}`, employee)
  //   }

  //   deleteEmployee(employeeId: number) {
  //     return API.delete(`/employees/${employeeId}`)
  //   }
}

export default new ScoreService()

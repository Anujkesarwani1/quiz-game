import { API } from './API'

class QuestionService {
  getAllQuestions() {
    return API.get('/questions')
  }

  //   createEmployee(employee: Employee) {
  //     return API.post('/employees', employee)
  //   }

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

export default new QuestionService()

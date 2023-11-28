import { API } from './API'

class QuestionService {
  getAllQuestions() {
    return API.get('/questions')
  }
}

export default new QuestionService()

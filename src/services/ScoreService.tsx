import { API } from './API'

class ScoreService {
  getAllScores() {
    return API.get('/scores')
  }

  createScores(score: any) {
    return API.post('/scores', score)
  }

  updateScore(scoreId: number, score: any) {
    return API.put(`/scores/${scoreId}`, score)
  }
}

export default new ScoreService()

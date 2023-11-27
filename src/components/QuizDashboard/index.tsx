import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionService from 'services/QuestionService'
import ScoreService from 'services/ScoreService'

interface QuizProps {
  user: any
}

interface UserAnswer {
  questionId: number
  isCorrect: boolean
}

const QuizDashboard = ({ user }: QuizProps) => {
  const [userName, setUserName] = useState('')
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    const response = await QuestionService.getAllQuestions()
    const fetchedQuestions = response.data
    setQuestions(shuffleArray(fetchedQuestions))
  }

  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const handleStartQuiz = () => {
    const name = prompt('Enter your name:')
    if (name) {
      if (name != user.fullName) {
        alert(
          'Sorry, you cannot give the quiz because your name does not match the one you gave while signing up.'
        )
        navigate('/')
      } else {
        setUserName(name)
        setStartTime(Date.now())
        setShowQuiz(true)
      }
    }
  }

  const handleAnswer = (selectedOption: any) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correctAnswer
    setUserAnswers([
      ...userAnswers,
      { questionId: currentQuestion.id, isCorrect },
    ])
    setScore(isCorrect ? score + 1 : score)
  }

  const handleSubmit = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleQuitQuiz = () => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000

    if (userName != '' || userAnswers.length != 0) {
      ScoreService.createScores({
        fullName: userName,
        score,
        time: timeTaken,
        answers: userAnswers,
        emailId: user.email,
      })
        .then((response) => {
          console.log(response.data, 'Data posted successfully')
        })
        .catch((error) => {
          console.log('Error while storing the score', error)
        })
        .finally(() => {
          setShowQuiz(false)
          // navigate('/')
        })
    } else {
      setShowQuiz(false)
      navigate('/')
    }
  }

  return (
    <div className="container mt-5">
      <h1 className='text-primary'>Quiz App</h1>

      {!userName ? (
        <>
          <h3 className="mt-5">Hey, {user.fullName}</h3>
          <h4>You can start the quiz by clicking Start Quiz button</h4>

          <button
            className="btn btn-primary mt-2"
            style={{ marginRight: '10px' }}
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
          <button className="btn btn-danger mt-2" onClick={handleQuitQuiz}>
            Quit Quiz
          </button>
        </>
      ) : showQuiz ? (
        <div>
          <h2>Hey, {userName}!</h2>
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questions[currentQuestionIndex].question}</p>
            {questions[currentQuestionIndex].options.map(
              (option: string, index: number) => (
                <div key={index} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id={`option${index}`}
                    onChange={() => handleAnswer(option)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option${index}`}
                  >
                    {option}
                  </label>
                </div>
              )
            )}
            <button
              className="btn btn-primary"
              style={{ marginRight: '10px' }}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button className="btn btn-danger" onClick={handleQuitQuiz}>
              Quit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Quiz Completed!</h3>
          <p>Your score: {score}</p>
          <p>
            Time taken: {Math.round((Date.now() - startTime) / 1000)} seconds
          </p>
          <h5>Thank you for submitting the answers {user.fullName}</h5>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate('/')
            }}
          >
            Log Out
          </button>
          {/* <button className="btn btn-danger" onClick={handleQuitQuiz}>
            Quit Quiz
          </button> */}
        </div>
      )}
    </div>
  )
}

export default QuizDashboard

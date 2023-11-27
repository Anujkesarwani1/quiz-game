import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScoreService from 'services/ScoreService'

interface AdminProps {
  user: any
}

const AdminDashboard = ({ user }: AdminProps) => {
  const [scores, setScores] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllScores()
  }, [])

  const getAllScores = () => {
    ScoreService.getAllScores()
      .then((response) => {
        setScores(response.data)
        setIsLoading(false)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const getWinner = () => {
    if (scores.length === 0) {
      return null
    }

    const highestScore = Math.max(...scores.map((score) => score.score))

    const candidatesWithHighestScore = scores.filter(
      (score) => score.score === highestScore
    )

    if (candidatesWithHighestScore.length === 1) {
      return candidatesWithHighestScore[0].fullName
    }

    const winner = candidatesWithHighestScore.reduce((prev, current) =>
      prev.time < current.time ? prev : current
    )

    return winner.fullName
  }

  return (
    <div className="container">
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <h2 className="text-center">Quiz App {user.fullName} Panel</h2>
          {/* <button
            className="btn btn-primary mb-2 mt-2"
            onClick={handleAddEmployee}
          >
            Add Employee
          </button> */}
          <button
            className="btn btn-danger mb-3 mt-3"
            onClick={() => navigate('/')}
          >
            Log Out
          </button>{' '}
          <h3 className="mt-3">Winner: {getWinner()}</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <th> S.No </th>
              <th> User Name </th>
              <th> User Score </th>
              <th> User Time </th>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score.id}>
                  <td> {score.id} </td>
                  <td>{score.fullName}</td>
                  <td> {score.score} </td>
                  <td>{score.time} Seconds</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

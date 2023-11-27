import './style.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Authentication from 'components/Authentication'
import QuizDashboard from 'components/QuizDashboard'
import AdminDashboard from 'components/AdminDashboad'

export const App = () => {
  const [user, setUser] = useState({})
  return (
    <Routes>
      <Route path="/" element={<Authentication setUser={setUser} />} />
      <Route path="/quiz" element={<QuizDashboard user={user} />} />
      <Route path="/admin" element={<AdminDashboard user={user} />} />
      <Route
        path="*"
        element={
          <div>
            <h3>Page Not Found!</h3>
          </div>
        }
      />
    </Routes>
  )
}

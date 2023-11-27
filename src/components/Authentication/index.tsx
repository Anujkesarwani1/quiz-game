import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, TextField, Typography } from '@mui/material'
import AuthService from 'services/AuthService'

interface AuthProps {
  setUser: any
}

const Authentication = ({ setUser }: AuthProps) => {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  // const [employee, setEmployee] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async (e: any, type: string) => {
    e.preventDefault()

    try {
      if (type === 'signup') {
        const newUser = { email, password, fullName, role: 'candidate' }
        const response = await AuthService.createUser(newUser)
        // console.log(response.data, "Data Store Ho Geya!")
        setUser(newUser)
        setLogin(true)
      } else {
        // navigate('/')
        const response = await AuthService.getUserByEmail(email)
        const UserData = response.data
        if (
          email === UserData[0].email &&
          password === UserData[0].password &&
          UserData[0].role === 'admin'
        ) {
          navigate('/admin')
          setUser({
            email,
            password,
            role: UserData[0].role,
            fullName: UserData[0].fullName,
          })
        } else if (
          email === UserData[0].email &&
          password === UserData[0].password &&
          UserData[0].role === 'candidate'
        ) {
          navigate('/quiz')
          setUser({
            email,
            password,
            role: UserData[0].role,
            fullName: UserData[0].fullName,
          })
        } else {
          console.log(email, password)
          if (email !== UserData[0].email) {
            alert('Wrong EmailId!')
          } else {
            alert('Wrong Password!')
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <h1 className="mb-5 text-primary">Welcome to the Quiz Game!</h1>
      <Stack flexDirection="row" gap={2} width="30rem">
        <Button
          disabled={login === false}
          onClick={() => setLogin(false)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          variant="outlined"
          size="large"
          fullWidth
        >
          Sign Up
        </Button>
        <Button
          disabled={login === true}
          onClick={() => setLogin(true)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          variant="outlined"
          size="large"
          fullWidth
        >
          Sign In
        </Button>
      </Stack>

      <Stack flexDirection="column" alignItems="center">
        <h1 className="mt-3">{login ? 'Sign In' : 'Sign Up'}</h1>

        {login === false && (
          <TextField
            sx={{ marginTop: '2rem', width: '30rem' }}
            label="Full Name"
            variant="outlined"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <TextField
          sx={{ marginTop: '2rem', width: '30rem' }}
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ marginTop: '2rem', width: '30rem' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e, login ? 'signin' : 'signup')}
          sx={{ textTransform: 'none', marginTop: '2rem', fontWeight: 'bold' }}
          size="large"
          fullWidth
        >
          {login ? 'Sign In' : 'Sign Up'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default Authentication

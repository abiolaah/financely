import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, provider } from '../firebase'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { createuserDocument } from '@/lib/helper'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'

// eslint-disable-next-line react/prop-types
const Signup = ({ onSwitch }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  // Function to validate email
  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  //function to sign up with email and password
  const signUpWithEmail = async e => {
    setLoading(true)
    e.preventDefault()

    //validating user input
    const isValid =
      name &&
      email &&
      password &&
      confirmPassword &&
      validateEmail(email) &&
      password === confirmPassword &&
      password.length >= 6

    if (!isValid) {
      !name && toast.error('Full name is required')
      !email && toast.error('Email is required')
      !password && toast.error('Password is required')
      !confirmPassword && toast.error('Confirm Password is required')
      !validateEmail(email) && toast.error('Invalid email address')
      password !== confirmPassword && toast.error('Passwords do not match')
      password.length < 6 &&
        toast.error('Password should be at least 6 characters')
      setLoading(false)
      return
    }

    //Authenticate the user or basically create a new user
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await createuserDocument(result.user)
      setLoading(false)
      toast.success('User Created Successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
      console.log('Error signing up with email and password: ', error)
      setLoading(false)
    }
  }

  //function to sign up with google
  const signInWithGoogle = async () => {
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, provider)
      console.log('Result:', result)

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // console.log('Credential:', credential)

      if (credential) {
        // eslint-disable-next-line no-unused-vars
        const token = credential.accessToken
        // console.log('Token:', token)

        // The signed-in user info.
        const user = result.user
        // console.log('User:', user)

        await createuserDocument(user)
        toast.success('User Authenticated Successfully')
        navigate('/dashboard')
      } else {
        throw new Error('Failed to get credential')
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error)

      if (error.customData) {
        // console.log('Error Email:', error.customData.email)
      } else {
        // console.log('Error Email: Not available')
      }

      const credentialError = GoogleAuthProvider.credentialFromError(error)
      if (credentialError) {
        // console.log('Error Credential:', credentialError)
      } else {
        // console.log('Error Credential: Not available')
      }

      toast.error(error.message)
      console.log('Error signing in with Google: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-[70%] max-w-[600px] h-auto shadow-xl p-4 rounded-2xl'>
      <h2 className='font-medium text-xl text-center'>
        Sign Up on <span className='text-blue-600'>Financely</span>
      </h2>
      <form className='flex flex-col justify-between items-center'>
        <div className='grid gap-0 my-2 mx-0 w-full max-w-sm'>
          <Label htmlFor='full-name' className='text-black mb-0 mt-0 text-left'>
            Full name
          </Label>
          <Input
            type='text'
            id='full-name'
            placeholder='John Doe'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className='grid gap-0 my-2 mx-0 w-full max-w-sm'>
          <Label htmlFor='email' className='text-black mb-0 mt-0 text-left'>
            Email
          </Label>
          <Input
            type='email'
            id='signup-email'
            placeholder='JohnDoe@gmail.com'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='grid gap-0 my-2 mx-0 w-full max-w-sm'>
          <Label htmlFor='password' className='text-black mb-0 mt-0 text-left'>
            Password
          </Label>
          <Input
            type='password'
            id='signup-password'
            placeholder='Example123'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 focus-visible:ring-px'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='grid gap-0 my-2 mx-0 w-full max-w-sm'>
          <Label htmlFor='password' className='text-black mb-0 mt-0 text-left'>
            Confirm Password
          </Label>
          <Input
            type='password'
            id='signup-confirm-password'
            placeholder='Example123'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 mb-2 focus-visible:ring-px'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type='submit'
          disabled={loading}
          className='items-center font-light bg-white rounded border-2 border-solid border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
          onClick={signUpWithEmail}
        >
          {loading ? `Loading...` : `Sign Up with Email and Password`}
        </Button>
      </form>
      <p className='items-center m-0'>or</p>
      <Button
        type='button'
        disabled={loading}
        className='items-center font-light rounded border-2 border-solid border-blue-600 text-white bg-blue-600 hover:bg-white hover:text-blue-400'
        onClick={signInWithGoogle}
      >
        {loading ? `Loading...` : `Sign Up with Google`}
      </Button>
      <p
        id='signin-switch'
        className='items-center mb-0 mt-2 cursor-pointer font-light'
        onClick={onSwitch}
      >
        Or Have An Account Already? Click here
      </p>
    </div>
  )
}

export default Signup

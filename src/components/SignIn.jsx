import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth, provider } from '../firebase'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { createuserDocument } from '@/lib/helper'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'

// eslint-disable-next-line react/prop-types
const SignIn = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  //function to sign in with email and password
  const signInWithEmail = async e => {
    setLoading(true)
    e.preventDefault()
    console.log('Login button works')
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      result.user
      toast.success('Logged In Successfully')
      navigate('/dashboard')
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      console.log('Error Signing in with email and password', error.message)
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
      console.log('Credential:', credential)

      if (credential) {
        const token = credential.accessToken
        console.log('Token:', token)

        // The signed-in user info.
        const user = result.user
        console.log('User:', user)

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
        console.log('Error Email:', error.customData.email)
      } else {
        console.log('Error Email: Not available')
      }

      const credentialError = GoogleAuthProvider.credentialFromError(error)
      if (credentialError) {
        console.log('Error Credential:', credentialError)
      } else {
        console.log('Error Credential: Not available')
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
        Log In on <span className='text-blue-600'>Financely</span>
      </h2>
      <form className='flex flex-col justify-between items-center'>
        <div className='grid gap-0 my-2 mx-0 w-full max-w-sm'>
          <Label htmlFor='email' className='text-black mb-0 mt-0 text-left'>
            Email
          </Label>
          <Input
            type='email'
            id='signin-email'
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
            id='signin-password'
            placeholder='Example123'
            className='border-0 border-b-2 border-solid border-slate-500 rounded-none py-2 px-0 mb-2 focus-visible:ring-px'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <Button
          type='submit'
          className='items-center bg-white rounded border-2 border-solid border-blue-600 font-light text-blue-400 hover:bg-blue-600 hover:text-white'
          onClick={signInWithEmail}
        >
          {loading ? `Loading` : `Login with Email and Password`}
        </Button>
      </form>
      <p className='items-center m-0'>or</p>
      <Button
        type='button'
        className='items-center rounded border-2 border-solid border-blue-600 text-white font-light bg-blue-600 hover:bg-white hover:text-blue-400'
        onClick={signInWithGoogle}
      >
        {loading ? `Loading` : `Login with Google`}
      </Button>
      <p
        id='signup-switch'
        className='items-center mb-0 mt-2 cursor-pointer font-light'
        onClick={onSwitch}
      >
        Or Don&apos;t Have An Account? Click here
      </p>
    </div>
  )
}

export default SignIn

import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../firebase'

import { useNavigate } from 'react-router-dom'

import userSvg from '/user.svg'
import { toast } from 'sonner'

const Header = () => {
  //track user's login state
  const [user] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const logout = () => {
    try {
      auth.signOut()
      navigate('/')
      toast.success('Logged Out Successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='bg-blue-700 py-4 px-6 sticky w-full flex items-center justify-between'>
      <p className='text-white font-medium text-xl m-0'>Finacely</p>
      {user ? (
        <p
          className='flex text-white font-normal text-lg m-0 cursor-pointer opacity-80 hover:opacity-100'
          onClick={logout}
        >
          <span className='mr-4'>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              alt='user'
              width={user.photoURL ? '32' : '24'}
              className='rounded-full'
            />
          </span>
          Logout
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Header

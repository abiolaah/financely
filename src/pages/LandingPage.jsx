import {useState} from 'react'

import Header from '@/components/Header'
import Signup from '@/components/Signup'
import SignIn from '@/components/SignIn'


const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSwitch = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      <Header />
      <div className='flex justify-center items-center w-screen h-[90vh]'>
      {showSignUp ? <Signup onSwitch={handleSwitch} /> : <SignIn onSwitch={handleSwitch} />}
      </div>
    </div>
  )
}

export default LandingPage

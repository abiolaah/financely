import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'

import { Toaster } from './components/ui/sonner.jsx'

function App () {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

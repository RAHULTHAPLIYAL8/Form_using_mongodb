import React from 'react'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import "./App.css"
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
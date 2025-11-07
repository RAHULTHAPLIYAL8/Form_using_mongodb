import React from 'react'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './layouts/Home'
import OurBook from './layouts/OurBook'
import Status from './components/Status'

import { BrowserRouter,Routes,Route} from 'react-router-dom'
import "./App.css"
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/status" element={<Status/>} />
        <Route path="/ourbook" element={<OurBook/>} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
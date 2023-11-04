import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'


import Navbar from './components/navbar';
import Users from './users/index'
import Add from './users/add';
import Edit from './users/edit'


function App() {
  const [count, setCount] = useState(0)

  return (
     <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/users/create' element={<Add />} ></Route>
        <Route path='/users/:id/edit' element={ <Edit />} ></Route>
      </Routes>
     </div>
   
  )
}

export default App

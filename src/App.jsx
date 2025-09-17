import { useState } from 'react'
import ExpenseTrack from './components/ExpenseTrack'
import ExpenceForm from './components/ExpenceForm'
import './index.css';   

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <ExpenseTrack/> 
    </>
  )
}

export default App

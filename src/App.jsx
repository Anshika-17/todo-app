import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="conatainer">
        <div className="bg-red-600">
          Hey I am red
        </div>
      </div>
    </>
  )
}

export default App

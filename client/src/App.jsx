import axios from 'axios'
import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [backend, setBackend] = useState("")
  useEffect(() => {
    axios({
  method: 'get',
  url: '/api/health',
})
      .then(function (response) {
        setBackend(response.data)

  })
  }, [])


  return (
    <div className="App">
      <div>hi</div>
      {backend}
    </div>
  )
}

export default App

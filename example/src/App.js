import React from 'react'

import { useMyHook } from 'react-use-external-assets'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App

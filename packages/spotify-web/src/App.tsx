import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from 'spotify-core'
import './App.css'
import { AuthView } from './app/components'

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <AuthView />
        <header className="App-header" />
      </div>
    </Provider>
  )
}

export default App

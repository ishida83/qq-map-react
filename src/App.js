import React, { Component } from 'react'
import './App.css'
import { Map } from './components'

const center = { lat: 22.53896, lng: 113.93386 }

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <Map position={center} style={{height: '800px'}} />
      </div>
    )
  }
}

export default App

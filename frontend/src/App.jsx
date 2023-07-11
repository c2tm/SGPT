import { useState } from 'react'
import Body from './components/body/body'
import Nav from './components/nav/nav'
import './App.css'

function App() {

  const [routerState, setRouterState] = useState('home');

  return (
    <>
      <div id="app-container"> 
        <Nav routerState={routerState} setRouterState={setRouterState} />
        <Body routerState={routerState} setRouterState={setRouterState} />
      </div>
      
    </>
  )
}

export default App

import { useState } from 'react'
import {Route,Routes,Outlet} from 'react-router-dom'
import NavBar from './components/NavBar'
import CharacterProfile from './pages/CharacterProfile';
import Characters from './pages/Characters';
import Episodes from './pages/Episodes';
import Home from './pages/Home';

function Layout()
{
  return(
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

function App() 
{
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/wiki" element={<Layout/>}>
            <Route path="characters">
              <Route index element={<Characters/>}/>
              <Route path=':id' element={<CharacterProfile/>}/>
            </Route>
            <Route path="episodes" element={<Episodes />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App

import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Characters from './pages/Characters';
import Home from './pages/Home';

function App() 
{
  
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/characters" element={<Characters />}>
            <Route path=":id" element={<Characters />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App

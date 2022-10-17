import {Route,Routes,Outlet} from 'react-router-dom'
import Episode from './pages/Episode';
import NavBar from './components/NavBar'
import CharacterProfile from './pages/CharacterProfile';
import Characters from './pages/Characters';
import Episodes from './pages/Episodes';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Location from './pages/Location';

window.addEventListener("click", (e) => 
{
  const navMob = document.querySelector(".navMob");

  if(e.target.closest(".mobButton") !== null) 
  {
    navMob.classList.toggle("active-navMob");
    return;
  }
  
  if(e.target.closest(".navMob") !== null && e.target.matches(".link-mob")===false)return

  navMob?.classList.remove("active-navMob");
});

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
            <Route path="episodes">
              <Route index element={<Episodes/>}/>
              <Route path=':id' element={<Episode/>}/>
            </Route>
            <Route path="locations">
              <Route index element={<Locations/>}/>
              <Route path=':id' element={<Location/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App

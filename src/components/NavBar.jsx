import { NavLink ,Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function NavBar() 
{

  return (
    <header className="bg-gradient-to-t from-gradientTop to-gradientBottom py-[.5rem] px-[1.8rem] fixed top-0 w-[100%] z-[100]">
      <div className="w-[100rem] max-w-[100%] my-0 mx-auto flex justify-between items-center">
        <Link className="text-white" to="/">
          Rick and Morty | wiki
        </Link>
        <nav>
          <ul className="flex gap-[2rem] items-center">
            <li className="mr-[1rem]">
              <SearchBar />
            </li>
            <li>
              <NavLink to="/characters" className="link font-bold">
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink to="/episodes" className="link font-bold">
                Episodes
              </NavLink>
            </li>
            <li>
              <NavLink to="/locations" className="link font-bold">
                Locations
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

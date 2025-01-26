import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { AuthContext } from '../../Context/AuthContextProvider';


export default function Navdar() {
  let{token , setToken} = useContext(AuthContext);
  let nav= useNavigate()
  function  Logout(){
  localStorage.removeItem('token');
  setToken(null);
  nav('/Login');
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:flex items-center justify-between" id="navbar-default">
  {token?            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <NavLink to="" className="block py-1 px-3" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/Product" className="block py-1 px-3" aria-current="page">
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart" className="block py-1 px-3" aria-current="page">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="block py-1 px-3" aria-current="page">
                  brands
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="block py-1 px-3" aria-current="page">
                  category
                </NavLink>
              </li>
            </ul>:''}
            <ul className="font-medium  ms-auto flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">

  <li>
    <a href="https://www.facebook.com" className="block py-1 px-3" aria-current="page">
      <i className="fab fa-facebook-f"></i> 
    </a>
  </li>
  <li>
    <a href="https://www.twitter.com" className="block py-1 px-3" aria-current="page">
      <i className="fab fa-twitter"></i> 
    </a>
  </li>
  <li>
    <a href="https://www.instagram.com" className="block py-1 px-3" aria-current="page">
      <i className="fab fa-instagram"></i> 
    </a>
  </li>
  <li>
    <a href="https://www.youtube.com" className="block py-1 px-3" aria-current="page">
      <i className="fab fa-youtube"></i> 
    </a>
  </li>
  {token?  <li
  onClick={Logout}>
    <NavLink to="/Logout" className="block py-1 px-3" aria-current="page">
      Logout
    </NavLink>
  </li>:<>
  <li>
    <NavLink to="/Login" className="block py-1 px-3" aria-current="page">
      Login
    </NavLink>
  </li>
  <li>
    <NavLink to="/Register" className="block py-1 px-3" aria-current="page">
      Register
    </NavLink>
  </li>
</>}

</ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

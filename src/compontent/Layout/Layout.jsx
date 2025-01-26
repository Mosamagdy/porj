import React from 'react'
import Navdar from '../Navbar/Navdar'
import Foter from '../Foter/Foter'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
    <Navdar/>
     <Outlet/>
    <Foter/>

    </div>
  )
}

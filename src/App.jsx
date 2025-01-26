import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './compontent/Layout/Layout'
import Home from './compontent/Home/Home'
import Product from './compontent/product/Product'
import Cart from './compontent/cart/Cart'
import Login from './compontent/Login/Login'
import Notfound from './compontent/Notfound/Notfound'
import Register from './compontent/Register/Register'
import Logout from './compontent/Logout/Logout'
import ForgotPassword from './compontent/Forgot Password/ForgotPassword'
import Updetpasswoerd from './compontent/Updetpassword/Updetpasswoerd'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRoutin from './Context/ProtectedRoutin'

export default function App() {
 let router= createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRoutin><Home/></ProtectedRoutin>},
      {path: 'Product',element:<ProtectedRoutin><Product/></ProtectedRoutin>},
      {path: 'Cart',element:<ProtectedRoutin><Cart/></ProtectedRoutin>},
      {path: 'Login',element:<Login/>},
      {path: 'ForgotPassword',element:<ForgotPassword/>},
      {path: 'Updetpasswoerd',element:<Updetpasswoerd/>},
      {path: 'register',element:<Register/>},
      {path: 'logout',element:<Logout/>},
      {path: '**',element:<Notfound/>},
  ]}
  ])
  return (
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>

  
   
  )
}

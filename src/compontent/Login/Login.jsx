import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContextProvider';
import logo from '../../assets/images/freshcart-logo.svg';

export default function Login() {
 
  let [errorMessage, setError] = useState(null);
  let{setToken}=  useContext(AuthContext);
  let navg = useNavigate();
  let initialValues = {
    email: '',
    password: '',
  };
  let validationSchema = Yup.object({
    email: Yup.string()
      .required('Email required')
      .email('Enter a valid email'),
    password: Yup.string()
      .required('Password required')
      .min(6, 'Password must be at least 6 characters'),
  });

  let loginForm = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema,
  });
  function loginApi(data) {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
      .then((response) => {
        if (response.data.message === 'success') {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          navg('/');
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (

  <div  className="flex flex-col items-center bg-[#3D5A3C] text-white p-10 min-h-screen">
         <div className="w-2/5  mb-6 flex justify-center">
        <img src={logo} alt="Flowbite Logo" className="w-full max-w-md" />
      </div>
    <div className="w-7/12 bg-[#3D5A3C] mx-auto shadow-2xl shadow-white/80  text-gray-900 p-8 rounded-lg">
    <form className=" " onSubmit={loginForm.handleSubmit}>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input 
      type="email" 
      id="email" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      placeholder="name@flowbite.com" 
      required 
      value={loginForm.values.email}
      onChange={loginForm.handleChange}
      onBlur={loginForm.handleBlur}
    />
    {loginForm.touched.email && loginForm.errors.email ? (
      <div className="text-red-600">{loginForm.errors.email}</div>
    ) : null}
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input 
      type="password" 
      id="password" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      required 
      value={loginForm.values.password}
      onChange={loginForm.handleChange}
      onBlur={loginForm.handleBlur}
       placeholder="Enter your password "
    />
    {loginForm.touched.password && loginForm.errors.password ? (
      <div className="text-red-600">{loginForm.errors.password}</div>
    ) : null}
    <Link to='/ForgotPassword'>ForgotPassword....?</Link>
  </div>
  <button 
    type="submit" 
    className="text-white bg hover:bg-bg focus:ring-4 focus:outline-none focus:ring-bg font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-bg dark:hover:bg dark:focus:ring-bg">
    Submit
  </button>
</form>

      </div>
      {errorMessage && (
        <div className="p-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}
        </div>
      )}
  </div>
   
  );
}
// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';
// import { AuthContext } from '../../Context/AuthContextProvider';
// import logo from '../../assets/images/freshcart-logo.svg';

// export default function Login() {
//   let [errorMessage, setError] = useState(null);
//   let { setToken } = useContext(AuthContext);
//   let navg = useNavigate();

//   let initialValues = {
//     email: '',
//     password: '',
//   };

//   let validationSchema = Yup.object({
//     email: Yup.string().required('Email required').email('Enter a valid email'),
//     password: Yup.string().required('Password required').min(6, 'Password must be at least 6 characters'),
//   });

//   let loginForm = useFormik({
//     initialValues,
//     onSubmit: loginApi,
//     validationSchema,
//   });

//   function loginApi(data) {
//     axios
//       .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
//       .then((response) => {
//         if (response.data.message === 'success') {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           navg('/');
//         }
//       })
//       .catch((err) => {
//         setError(err.response.data.message);
//       });
//   }

//   return (
//     <div className="flex flex-col items-center bg-[#3D5A3C] text-white p-10 min-h-screen">
     
//       <div className="w-2/5 mb-6 flex justify-center">
//         <img src={logo} alt="Flowbite Logo" className="w-full max-w-md" />
//       </div>

//       {/* النموذج داخل صندوق مرتب ومنسق */}
//       <div className="w-7/12 mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-2xl">
//         <form onSubmit={loginForm.handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="email" className="block mb-2 text-sm font-medium">البريد الإلكتروني</label>
//             <input
//               type="email"
//               id="email"
//               className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//               placeholder="name@flowbite.com"
//               required
//               value={loginForm.values.email}
//               onChange={loginForm.handleChange}
//               onBlur={loginForm.handleBlur}
//             />
//             {loginForm.touched.email && loginForm.errors.email && (
//               <div className="text-red-600">{loginForm.errors.email}</div>
//             )}
//           </div>

//           <div className="mb-5">
//             <label htmlFor="password" className="block mb-2 text-sm font-medium">كلمة المرور</label>
//             <input
//               type="password"
//               id="password"
//               className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
//               required
//               placeholder="أدخل كلمة المرور"
//               value={loginForm.values.password}
//               onChange={loginForm.handleChange}
//               onBlur={loginForm.handleBlur}
//             />
//             {loginForm.touched.password && loginForm.errors.password && (
//               <div className="text-red-600">{loginForm.errors.password}</div>
//             )}
//             <Link to="/ForgotPassword" className="text-blue-500 text-sm">هل نسيت كلمة المرور؟</Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5"
//           >
//             تسجيل الدخول
//           </button>
//         </form>

//         {errorMessage && (
//           <div className="p-4 mt-4 text-sm text-red-800 bg-red-50 rounded-lg">
//             {errorMessage}
//           </div>
//         )}
//       </div>

//       {/* النص أسفل النموذج */}
//       <p className="mt-6 text-lg">مرحبًا بك! يرجى تسجيل الدخول للوصول إلى حسابك.</p>
//     </div>
//   );
// }

// import React, { useContext, useEffect, useState } from 'react';
// import { Cartcontext } from '../../Context/CartContextProveder';
// import { Toaster, toast } from 'react-hot-toast';
// import { data, Link } from 'react-router-dom';
// import axios from 'axios';

// export default function MywishList() {
//   let { getUrl ,delUrl ,setNambercart ,ClierUrl,UpdetUrl } = useContext(Cartcontext);
//   const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
//   let [cartData, setCartData] = useState(null);
//   let [Loding, setLoding] = useState(true);

//   useEffect(() => {
//     getCartData();
//   }, []);

//    async function getCartData() {
//     setLoding(true);
//     response()
//       .then((req) => {
//         console.log(req.data);
//         setCartData(req.data.data);
//         setLoding(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoding(false);
//       });
//   }
//   function DelCartData(id) {
//     delUrl(id)
//       .then((req) => {
//         console.log(req.data);
//         setCartData(req.data.data);
//         setNambercart(req?.data?.numOfCartItems)
//           toast.success("Item successfully deleted.");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   function ClierCartUrl() {
//     ClierUrl()
//       .then((req) => {
//         console.log(req.data);
//         setCartData(req.data.data);
//         setNambercart(req?.data?.numOfCartItems)
//           toast.success("Item successfully deleted.");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   function UpdetUrlCartUrl(id,count) {
//     UpdetUrl(id,count)
//       .then((req) => {
//         console.log(req.data);
//         setCartData(req.data.data);
//         setNambercart(req?.data?.numOfCartItems)
//           toast.success(" successfully.");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   if (Loding) {
//     return (
//       <div className='bg-stone-700 flex justify-center items-center h-screen'>
//         <span className="loader"></span>
//       </div>
//     );
//   }
//   return (
// <>
//  <Toaster />
// {cartData?.products.length>0?<div>
//       <div className='w-11/12 mx-auto my-5 '>
//         <div className='bg-gray-300'>
//           <h2 className='text-2xl'>Shop Cart</h2>
//       <div className='flex justify-between'>
//       <h2 className='text-2xl my-3 text-lime-700'>Total Cart price: {cartData?.totalCartPrice} EGP</h2>
//     <button  onClick={ClierCartUrl} className='border p-1 text-2xl border-red-700 my-2 mx-3 rounded bg-red-700 '>Deleted alll</button>
//       </div>
//           <div className='divide-y-2 divide-gray-500'>


//             {cartData?.products?.map((item)=>{
//               return(          <div key={item._id} className='flex items-center py-3'>
//                 <div className='w-10/12'>
//                   <div className='flex  justify-between items-center'>
//                     <div className='w-2/12'>
//                       <img src={item?.product?.imageCover} className=' p-2 w-full' alt='' />
//                     </div>
//                     <div className='w-10/12'>
//                       <h2 className='text-2xl'>{item?.product?.title}</h2>
//                       <h2 className='text-green-700 text-2xl'>price {item.price}EGP</h2>
//                       <button  onClick={() => {DelCartData(item?.product?._id)}}className='border p-1 border-red-700 my-2 mx-3 rounded text-red-700 hover:bg-red-700 hover:text-white'>
//                         <i className='fa-solid fa-trash-can mr-2'></i> Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='w-2/12'>
//                   <i onClick={()=>{UpdetUrlCartUrl(item?.product?._id,item.count+1)}} className='fa-solid fa-plus cursor-pointer border border-green-700 rounded mx-1 p-2'></i>
//                   <span className='mx-2'>{item.count}</span>
//                   <i  onClick={()=>{UpdetUrlCartUrl(item?.product?._id,item.count-1)}}  className='fa-solid cursor-pointer fa-minus border border-green-700 rounded mx-1 p-2'></i>
//                 </div>
//               </div>)
//             })}
  
//           </div>
         
//         </div>
//         <Link to={'/SippingDitals/'+cartData._id} class="text-center  block text-2xl text-white w-full bg-green-700 py-2 my-3">
//         pay <i class="fab fa-cc-visa text-2xl text-white"></i>
//     </Link>
//       </div>
    
//     </div>: 
//     <div className='text-red-700 bg-lime-500 text-center'>  No data </div>
//     }

// </>
//   );
// } 
import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MyWishlistContext } from "../../Context/MywishListContextProveder/MywishListContextProveder";
import { Cartcontext } from "../../Context/CartContextProveder";

export default function MyWishlist() {
  const { getUrl, deleteUrl, clearUrl } = useContext(MyWishlistContext);
  const { PostUrl, setNambercart } = useContext(Cartcontext);
  
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeItems, setActiveItems] = useState({});

  useEffect(() => {
    fetchWishlistData();
  }, []);

  function fetchWishlistData() {
    setLoading(true);
    getUrl()
      .then((res) => {
        setWishlistItems(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleDelete(id) {
    deleteUrl(id)
      .then(() => {
        toast.success("Item successfully deleted.");
        setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setActiveItems((prevState) => ({ ...prevState, [id]: true }));
      })
      .catch(() => toast.error("Failed to delete item."));
  }



  const addCart = async (id) => {
    try {
      const res = await PostUrl(id);
      setNambercart(res.data.numOfCartItems);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className='bg-stone-700 flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {wishlistItems.length > 0 ? (
        <div style={{ backgroundColor: "#3D5A3C", color: "#FFF", padding: "20px" }}>
          <h2 className='text-2xl'>My Wishlist</h2>

      
          <div className='divide-y-2 divide-gray-500'>
          {wishlistItems.map((item) => (
          <div key={item._id} className="flex flex-col sm:flex-row items-center py-3 overflow-x-hidden">
            
            {/* صورة المنتج - تأخذ الحجم الكامل فقط في الشاشات الكبيرة، وتكون أصغر في الهواتف */}
            <div className="w-full py-4 sm:w-2/12 max-w-full sm:max-w-xs">
              <img 
                src={item.imageCover} 
                className="p-2 w-full h-40 sm:h-32 md:h-64 lg:h-80 xl:h-96 object-contain rounded-md" 
                alt={item.title} 
              />
            </div>

            {/* تفاصيل المنتج - تكون أسفل الصورة فقط في الهواتف */}
            <div className="w-full p-10 sm:w-10/12 text-center sm:text-left flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold">{item.title}</h2>
              <h2 className="text-green-700 text-md sm:text-lg">Price: {item.price} EGP</h2>

              {/* زر حذف من القائمة المفضلة */}
              <button 
                onClick={() => handleDelete(item._id)} 
                className="border-none bg-transparent p-2 text-left text-red-500 text-2xl sm:text-3xl mt-2"
              >
                <i className="fa-solid fa-heart"></i>
              </button>

              {/* زر إضافة إلى السلة */}
              <button 
                onClick={() => addCart(item._id)} 
                className="bg-green-500 text-white w-full py-2 mt-3 rounded-lg hover:bg-green-700 transition-all"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
          </div>
        </div>
      ) : (
        <div className='bg-stone-700 flex justify-center items-center h-screen'>
          <span className="text-white text-2xl">Your wishlist is empty.</span>
        </div>
      )}
    </>
  );
}
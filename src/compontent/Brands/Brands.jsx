// import axios from 'axios';
// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import SimpleSlider from '../../SimpleSlider/SimpleSlider';
// import CategoriesSlider from '../../categories/CategoriesSlider';

// const fetchProducts = async () => {
//   const response = await axios.get(`http://www.themealdb.com/api/json/v1/1/search.php?s`);
//   console.log(response.data);
  
//   return response.data;
// };

// export default function Brands() {
//   const [page, setPage] = useState(1); // تعريف page واستخدام useState للتحكم به
//   const { data, isLoading, isError, error } = useQuery({
//     queryFn: fetchProducts,
//     keepPreviousData: true,
//   });

//   if (isLoading) {
//     return (
//       <div className='bg-stone-700 flex justify-center items-center h-screen'>
//         <span className="loader"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return <div className='text-red-500 text-center'>Failed to load products. Please try again later. Error: {error.message}</div>;
//   }

//   const productList = data.meals || []; // تعديل هنا للوصول إلى قائمة المنتجات بشكل صحيح
//   const numberOfPages = Math.ceil(productList.length / 10); // افتراض عدد صفحات بناءً على عدد المنتجات
//   const numspag = Array.from({ length: numberOfPages }, (_, i) => i + 1);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= numberOfPages) {
//       setPage(newPage); // تحديث الصفحة الحالية
//     }
//   };

//   return (
//     <div>
//       <div className='w-11/12 mx-auto my-1 p-2'>
//         <div className='my-5'>
//           <SimpleSlider />
//           <CategoriesSlider />
//         </div>
//         <div className='flex flex-wrap'>
//           {productList.map((product) => {
//             const { idMeal, strMeal, strMealThumb, dateModified } = product;
//             return (
//               <div key={idMeal} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full p-2'>
//                 <Link to={`/CategoryBrands/${idMeal}`}>
//                   <div className='item border hover:border-green-700 p-1 group overflow-hidden'>
//                     <img src={strMealThumb} alt={strMeal || 'Product'} className=' rounded-full  w-full' />
//                     <h5 className='text-green-700'>{strMeal || 'Unknown Brand'}</h5>
//                     <div className='flex justify-between'>
//                       <span>{new Date(dateModified).toLocaleDateString()}</span>
//                     </div>
//                     <button className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>add to cart</button>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }





























import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import CategoriesSlider from '../../categories/CategoriesSlider';
import ims from '../../assets/images/411.jpg'; 

const fetchProducts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  console.log("⏳ Fetching data for page:", page);

  try {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
    console.log("✅ API Response:", response.data);

    if (!response.data || response.data.results === 0 || response.data.data.length === 0) {
      console.warn("⚠️ No data found for page:", page);
      throw new Error("No data available."); // رمي خطأ مخصص
    }

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
};

export default function Brands() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    keepPreviousData: false, // تعطيل التحديث التلقائي للبيانات
  });

  console.log("🔄 Loading Status:", isLoading);
  console.log("⚠️ Error Detected:", isError, error);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className='bg-stone-700 flex justify-center items-center h-screen'>
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-black">
      <img src={ims} alt="Error Page" className="h-full w-full object-contain" />
    </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className='w-11/12 mx-auto p-2'>
        <div className='my-5'>
          <SimpleSlider />
          <CategoriesSlider />
        </div>
        <div className='flex flex-wrap'>
          {data?.data?.map((product) => (
            <div key={product._id} className='lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2'>
              <Link to={`/CategoryBrands/${product._id}`}>
                <div className='item p-1 group overflow-hidden hover:shadow-2xl hover:shadow-green-500'>
                  <img src={product.image} alt={product.name || 'Product'} className='w-full' />
                  <h5 className='text-green-700'>{product.name || 'Unknown Brand'}</h5>
                  <h2>{product.slug ? product.slug.split(" ").slice(0, 2).join(" ") : 'No Slug'}</h2>
                  <button className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>
                    View brand
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
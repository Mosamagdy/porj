
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';

// export default function Categories() {
//     let { id } = useParams();
//     let [mainImage, setMainImage] = useState(null);

//     const getCategoryProducts = async ({ queryKey }) => {
//         const [_key, id] = queryKey;
//         try {
//             const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/`);
//             return data;
//         } catch (error) {
//             console.error('API Error:', error.response || error.message);
//             throw new Error(error.response?.data?.message || 'Failed to fetch category');
//         }
//     };

//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ['CategoryProducts', id],
//         queryFn: getCategoryProducts
//     });

//     const category = data?.data;

//     if (isLoading) {
//         return <div className='bg-stone-700 flex justify-center items-center h-screen'><span className="loader"></span></div>;
//     }

//     if (isError) {
//         return <div className='text-red-500 text-center'>Failed to load category details. Please try again later. Error: {error.message}</div>;
//     }

//     function changeImage(image) {
//         setMainImage(image);
//     }

//     return (
//         <>
// <div className='w-10/12 mx-auto my-5'>
//   <h2 className='text-2xl my-5'>Category Products</h2>
//   <div className='flex flex-wrap'>
//     {category?.map((item) => (
//       <div key={item._id} className='lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2'>
//         <div className='item p-1 group overflow-hidden hover:shadow-2xl hover:shadow-green-500 h-full flex flex-col'>
//           <div className='relative flex-grow'>
//             <img src={mainImage || item.image || 'fallback-image-url.jpg'} alt={item.name} className='w-full h-full object-contain' />
//           </div>
//           <div className='flex flex-col justify-between'>
//             <h5 className='text-green-700'>{item.name}</h5>
//             <button onClick={() => console.log('View category', item._id)} className='bg w-full border-r rounded py-1 transition-transform duration-500 transform translate-y-10 group-hover:translate-y-0'>
//               View Category
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//             <footer className="bg-gray-800 text-white p-4 mt-8">
//                 <div className="container mx-auto text-center">
//                     <p>© 2025 Your Company. All rights reserved.</p>
//                     <p>
//                         <a href="/privacy-policy" className="text-green-400">Privacy Policy</a> | 
//                         <a href="/terms-of-service" className="text-green-400"> Terms of Service</a>
//                     </p>
//                 </div>
//             </footer>
//         </>
//     );
// }

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';

export default function CategorySlider() {
  let [categories, setCategories] = useState([]);
  let sliderRef = useRef(null);

  async function GetAllProducts() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products/');
      let categoryMap = new Map();
      res.data.data.forEach((product) => {
        if (!categoryMap.has(product.category._id)) {
          categoryMap.set(product.category._id, product.category);
        }
      });
      setCategories(Array.from(categoryMap.values()));
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  }

  useEffect(() => {
    GetAllProducts();
  }, []);

  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000, // زيادة السرعة قليلاً لتجنب أي توقف مفاجئ
    slidesToShow: 3,
    slidesToScroll: 1, // تغيير عدد الشرائح التي يتم تمريرها لتكون أكثر سلاسة
    cssEase: "linear", // جعل الحركة أكثر سلاسة
    pauseOnHover: false // منع التوقف عند مرور الماوس
  };

  return (
    <div className="my-5 mt-10 relative">
      <Slider ref={sliderRef} {...sliderSettings}>
        {categories.map((category) => (
          <div key={category._id} className="cursor-default">
            <img
              src={category.image ? category.image : 'path/to/placeholder.jpg'}
              className="h-64 w-full object-cover object-top"
              alt={category.name ? category.name : 'Category Image'}
            />
            <h5 className="text-center">{category.name}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}
// import Navbar from "../customer/Components/Navbar/Navbar.js";
// import React, { useEffect, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Footer from '../customer/Components/footer/Footer';
// import Slider from "react-slick";
// import ProductComponent from '../customer/Components/Adverties/Adverties.js';
// import FrozenSnacks from '../customer/Components/Products/Product.js';
// import GadgetSection from '../customer/Components/Products/GadgetSection.js';
// import PopularBrand from '../customer/Components/Brand/Popularbrand.js';
// import './HomePage.css';

// import TrendingProducts from "../customer/Components/Adverties/Tranding.js";
// import HomePageAdvertisement from "../customer/Components/HomePageAdvertisement/HomePageAdvertisement.js";
// import Maylike from "../customer/Components/Adverties/Maylike.js";

// function HomePage() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 630);
//   const [viewport, setViewport] = useState(window.innerWidth < 620);

//   useEffect(() => {
//     const handleResize = () => {
//       const isMobileView = window.innerWidth < 620;
//       setIsMobile(isMobileView);
//       setViewport(isMobileView);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Set initial state

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 3000,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//   };

//   return (
//     <div className="overflow-hidden bg-gray-100">
//       <Navbar />
//       <div className="w-[95vw] mx-auto overflow-hidden mt-5 rounded-md">
//         <Slider {...settings} className="rounded-md">
//           <div className="w-full rounded-md">
//             <a href="./product/1" className="rounded-md">
//               <div className="flex items-center justify-center bg-opacity-50 rounded-md h-1/2 w-full">
//                 <img
//                   src="./skin_care.jpg"
//                   className="object-cover h-[20vh] lg:h-[45vh] w-full rounded-md"
//                   alt="Skin Care"
//                 />
//               </div>
//             </a>
//           </div>
//           <div className="w-full rounded-md">
//             <a href="./product/2" className="rounded-md">
//               <div className="flex items-center justify-center bg-opacity-50 rounded-md w-full">
//                 <img
//                   src="./chocolates.jpg"
//                   className="object-cover h-[20vh] lg:h-[45vh] w-full rounded-md"
//                   alt="Chocolates"
//                 />
//               </div>
//             </a>
//           </div>
//           <div className="w-full rounded-md">
//             <a href="./product/1" className="rounded-md">
//               <div className="flex items-center justify-center bg-opacity-50 rounded-md w-full">
//                 <img
//                   src="./dailyneeds.jpg"
//                   className="object-cover h-[20vh] lg:h-[45vh] w-full rounded-md"
//                   alt="Daily Needs"
//                 />
//               </div>
//             </a>
//           </div>
//           <div className="w-full rounded-md">
//             <a href="./product/1" className="rounded-md">
//               <div className="flex items-center justify-center bg-opacity-50 rounded-md w-full">
//                 <img
//                   src="./snacks.jpg"
//                   className="object-cover h-[20vh] lg:h-[45vh] w-full rounded-md"
//                   alt="Snacks"
//                 />
//               </div>
//             </a>
//           </div>
//         </Slider>
//       </div>

//       {!isMobile && (
//         <div className="relative bg-white px-5 py-16 mt-5 mx-6 mb-5 rounded-lg">
//           <h2 className="text-lg sm:text-2xl mb-3 font-semibold">Trending Products</h2>
//           <TrendingProducts />
//         </div>
//       )}
//       <GadgetSection />
//       {!isMobile && (
//         <div className="relative bg-white px-5 py-16 mt-5 mx-6 mb-5 rounded-lg">
//           <h2 className="text-lg sm:text-2xl mb-3 font-semibold">Frozen Snacks</h2>
//           <TrendingProducts/>
//         </div>
//       )}
//       <ProductComponent />
//       <HomePageAdvertisement />
//       <Maylike />
//       <PopularBrand />
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;
import Navbar from "../customer/Components/Navbar/Navbar.js";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../customer/Components/footer/Footer';
import Slider from "react-slick";
import ProductComponent from '../customer/Components/Adverties/Adverties.js';
import FrozenSnacks from '../customer/Components/Products/Product.js';
import GadgetSection from '../customer/Components/Products/GadgetSection.js';
// import GadgetSection from '../customer/Components/Product/Products/GadgetSection.js';
import PopularBrand from '../customer/Components/Brand/Popularbrand.js';
import './HomePage.css';

import TrendingProducts from "../customer/Components/Adverties/Tranding.js";
import HomePageAdvertisement from "../customer/Components/HomePageAdvertisement/HomePageAdvertisement.js";
import Maylike from "../customer/Components/Adverties/Maylike.js";

import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertisements } from "../Redux/Advertisements/advertisementSlice.js";
import { Link } from "react-router-dom";
import AdvertisementFinal from "../customer/Components/Adverties/AdvertismentFinal.js";


function HomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 630);
  const [viewport, setViewport] = useState(window.innerWidth < 620);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 620;
      setIsMobile(isMobileView);
      setViewport(isMobileView);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemss = [
    {
      id: 1,
      href: "./product/2",
      src: "./chocolates.jpg",
      alt: "Chocolates",
    },
    {
      id: 2,
      href: "./product/1",
      src: "./dailyneeds.jpg",
      alt: "Daily Needs",
    },
    {
      id: 3,
      href: "./product/3",
      src: "./snacks.jpg",
      alt: "Snacks",
    },
  ];
  const items = [
    {
      id: 0,
      href: "./product/1",
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg",
      alt: "Daily Needs",
    },
    {
      id: 1,
      href: "./product/2",
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg",
      alt: "Chocolates",
    },
    
  ];
  

  const dispatch = useDispatch();
  const { advertisements, status: adsstatus } = useSelector((state) => state.advertisements || {});

  useEffect(() => {
    dispatch(fetchAdvertisements());
  }, [dispatch]);
  

  useEffect(() => {
    if (adsstatus === 'succeeded') {
      console.log("PUBLISHED ADVERTISEMENTS first element product brand: ", advertisements[0]);
    }
  }, [advertisements, adsstatus]);



  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  // const prodID = advertisements[4].product._id;

  return (
  <>
      <Navbar />
    <div className="flex flex-col overflow-hidden bg-white">
      <div className="w-full flex justify-center items-center">
        <div className="w-7/8 overflow-hidden m-2 p-12 rounded-md">
        <Slider {...settings} className="rounded-md">
        {adsstatus === "succeeded" && (
          (() => {
            // Filter the advertisements by section
            const filteredAdvertisements = advertisements.filter(
              (publishedAdvertisement) => publishedAdvertisement.section === "Section 0"
            );

            // Check if the filtered array length is greater than 0
            if (filteredAdvertisements.length > 0) {
              return filteredAdvertisements.map((publishedAdvertisement) => (
                <div className="w-full p-4 rounded-md" key={publishedAdvertisement.id}>
                  <div className="flex items-center justify-center bg-opacity-50 rounded-md h-1/2 w-full">
                    <img
                      src={publishedAdvertisement.imageUrl}
                      className="object-fill h-[20vh] lg:h-[45vh] w-full rounded-md"
                      alt="Banner"
                    />
                  </div>
                </div>
              ));
            } else {
              // Render something else if no advertisements are found for Section 0
              return items.map((item) => (
                <div className="w-full p-4 rounded-md" key={item.id}>
                    {/* <a href="./product/${advertisement.product._id}" className="rounded-md"> */}
                    <div className="flex items-center justify-center bg-opacity-50 rounded-md w-full">
                      <img

                        src={item.src}
                        className="object-fill h-[20vh] lg:h-[45vh] w-full rounded-md"
                        alt="Skin Care"
                      />
                    </div>
                    {/* </Link> */}
                  </div>
                // <div key={item.id} className="w-fit p-10 rounded-md">
                //   <a href={item.href} className="rounded-md">
                //     <div className="flex items-center justify-center bg-opacity-50 rounded-md w-fit ">
                //       <img
                //         src={item.src}
                //         className="h-fit w-fit rounded-md"
                //         alt={item.alt}
                //       />
                //     </div>
                //   </a>
                // </div>
              ))
            }
          })()
        )}
          
        </Slider>
      </div>
      </div>


      <div className="relative bg-white py-5 mt-5  mb-5">
        <TrendingProducts />
      </div>

      <GadgetSection advertisements={advertisements} status={adsstatus} />

      <div className="relative bg-white  py-5 mt-5  mb-5">
        <FrozenSnacks />
      </div>

      <ProductComponent advertisements={advertisements} status={adsstatus} />
      <HomePageAdvertisement advertisements={advertisements} status={adsstatus} />
      <AdvertisementFinal/>
      <Maylike />
      <PopularBrand />
      <Footer />
    </div>
  </>
  );
}

export default HomePage;

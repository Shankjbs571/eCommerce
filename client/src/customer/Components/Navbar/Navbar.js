// import React, { useEffect, useState } from "react";
// import Register from "../Auth/Register";
// import {
//   FaUser,
//   FaHeart,
//   FaBox,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { clearUser } from "../../../Redux/User/userSlice";
// import logo from "../../../logo.png";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart } from '../../../Redux/Cart/cartSlice';
// import { fetchCategories } from "../../../Redux/Category/categoriesSlice.js"; // Adjust the path as necessary
// import { signoutUser } from "../../../Redux/User/userSlice";
// import "./navbar_sty.css";

// const Navbar = (props) => {
//   const [showModal, setShowModal] = useState(false);
//   const [hoverDropdown, setHoverDropdown] = useState(false);
//   const [hoverProfile, setHoverProfile] = useState(false); // Track profile hover state
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//   const [showProfileMenu, setShowProfileMenu] = useState(false); // For mobile profile menu
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const [search, setSearch] = useState("");
//   const { items } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const authToken = localStorage.getItem("authToken");
//   const isAuthenticated = !!authToken;

//   const categories = useSelector((state) => state.categories.categories);
//   const handleSide = (path) => {
//     navigate(path);
//   };

//   const renderCategories = () => {
//     return categories
//       .filter((category) => category.level === 1)
//       .map((category, i) => {
//         if (i < 8) {
//           return (
//             <button
//               onClick={() => handleSide(`/category/${category._id}`)}
//               className={`category-button ${category.name === 'Groceries' ? 'bg-orange-500 text-black' : 'bg-gray-200 text-black-700'}`}
//               key={category._id}
//             >
//               {category.name}
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//           );
//         }
//         return null;
//       });
//   };


//   const handleNavigate = () => {
//     navigate("/category");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim() === "") return; // Check if the search field is empty
//     navigate(`/search/${search}`);
//   };

//   const showCart = () => {
//     navigate("/cart");
//   };

//   const handleProfileClick = () => {
//     if (localStorage.getItem("role") === "ADMIN") {
//       navigate("/admin");
//     } else {
//       navigate("/myprofile/profile-information");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(signoutUser());
//     dispatch(clearUser());
//     window.location.reload();
//   };

//   const handleMouseEnter = (event) => {
//     if (isAuthenticated) {
//       const { top, left, height } = event.currentTarget.getBoundingClientRect();
//       setDropdownPosition({ top: top + height, left });
//       setHoverProfile(true); // Track profile hover state
//       setHoverDropdown(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isAuthenticated) {
//       setTimeout(() => {
//         if (!hoverProfile && !hoverDropdown) {
//           setHoverDropdown(false);
//         }
//       }, 100);
//     }
//   };

//   const [viewport, setViewport] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 620);

//   useEffect(() => {
//     const handleResize = () => {
//       setViewport(window.innerWidth < 768);
//       setIsMobile(window.innerWidth < 620);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);



//   return (
//     <>
//       <div className="shadow-lg overflow-hidden relative">
//         {/* Top Navbar */}
//         <div className="bg-orange-600 p-4 flex items-center justify-between">
//           <a href="/" className=" logo-title">
//             <img src={logo} alt="Logo"  crossOrigin="anonymous" />
//             {/* <h2 className="text-white text-xl">Aapla <span className="text-red-500">Bajar</span></h2> */}
//           </a>
//           <div className="hidden md:flex items-center search-form">
//           <form onSubmit={handleSearch} className="flex items-center search-form-container">
//             <span className="search-icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 14l-2.2 2.2c-.4.4-1 .4-1.4 0l-.6-.6c-.4-.4-.4-1 0-1.4L7 12c.4-.4 1-.4 1.4 0l2.2 2.2zm8-4a8 8 0 11-16 0 8 8 0 0116 0z"
//                 />
//               </svg>
//             </span>
//             <input
//               type="search"
//               placeholder="Search essentials, groceries and more..."
//               className="border-[2px] border-zinc-300 rounded-md shadow-md p-2 pl-10 w-[40vw] lg:w-[35vw] dark:bg-white dark:text-black search-input"
//               onChange={(e) => setSearch(e.target.value)}
//               required
//               value={search}
//             />
//             {/* <button type="submit" className="bg-blue-500 border-[2px] border-blue-500 text-white p-2 rounded-lg font-sans search-button">
//               SEARCH
//             </button> */}
//           </form>
//           {/* <form onSubmit={handleSearch} className="flex">
//             <input
//               type="search"
//               placeholder="Search essentials, groceries and more..."
//               className="border-[2px] border-zinc-300 rounded-l-md shadow-md p-2 w-[40vw] lg:w-[35vw] dark:bg-white dark:text-black search-input"
//               onChange={(e) => setSearch(e.target.value)}
//               required
//               value={search}
//             />
//             <button type="submit" className="bg-blue-500 border-[2px] border-blue-500 text-white p-2 rounded-r-lg font-sans search-button">
//               SEARCH
//             </button>
//           </form> */}
//           </div>
//           <div className="flex items-center space-x-4">
//             <div
//               className="flex items-center space-x-2 rounded-md p-2 border-[1px] border-none profile-dropdown-trigger"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               onClick={() => setShowProfileMenu(!showProfileMenu)} // Toggle profile menu on click
//             >
//               <svg
//                 className="w-6 h-6 text-zinc-700 border-zinc-700 border-[2px] bg-white rounded-xl"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M5.121 17.804A8.966 8.966 0 0112 15c2.485 0 4.735.994 6.379 2.621M15 10a3 3 0 11-6 0 3 3 0 016 0z"
//                 ></path>
//               </svg>
//               {isAuthenticated ? (
//                 <span>
//                   <svg
//                     className="w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 9l-7 7-7-7"
//                     ></path>
//                   </svg>
//                 </span>
//               ) : (
//                 <button onClick={() => setShowModal(true)} className="text-black font-medium">
//                   Register
//                 </button>
//               )}
//               <Register showModal={showModal} setShowModal={setShowModal} />
//             </div>
//             {hoverDropdown || showProfileMenu ? (
//               <div
//                 className="fixed bg-white shadow-lg space-y-2 w-fit border-[1px] border-gray-200 rounded-md z-[1000] navbar-profile-dropdown visible"
//                 style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
//                 onMouseEnter={() => setHoverDropdown(true)}
//                 onMouseLeave={() => setHoverDropdown(false)}
//               >
//                 <button
//                   onClick={() => navigate('/myprofile/profile-information')}
//                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left navbar-profile-dropdown-item"
//                 >
//                   <FaUser className="mr-2" />
//                   My Profile
//                 </button>
//                 <button
//                   onClick={() => navigate('/myprofile/likes')}
//                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left navbar-profile-dropdown-item"
//                 >
//                   <FaHeart className="mr-2" />
//                   Wishlist
//                 </button>
//                 <button
//                   onClick={() => navigate('/myprofile/orders')}
//                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left navbar-profile-dropdown-item"
//                 >
//                   <FaBox className="mr-2" />
//                   Orders
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left navbar-profile-dropdown-item"
//                 >
//                   <FaSignOutAlt className="mr-2" />
//                   Logout
//                 </button>
//               </div>
//             ) : null}
//           </div>
//           <div className="flex items-center ml-4 lg:space-x-2">
//             <button onClick={showCart}>
//               <svg
//                 className="w-8 h-8 text-black-500 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="1"
//                   d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
//                 />
//               </svg>
//             </button>
//             <sup className="text-bold px-2 rounded-full bg-red-500 text-black text-lg animate-bounce" style={{ marginTop: '-15px', marginLeft: '-5px' }}>
//               {items && items[0] && items[0].length}
//             </sup>
//           </div>
//         </div>

//         {/* Search bar for mobile */}
//         {/* {isMobile && (

//           // <form onSubmit={handleSearch} className="search-form-mobile flex items-center mt-2 p-4">
//           //   <input
//           //     className="search-input-mobile border border-gray-400 rounded-lg p-2 flex-grow"
//           //     type="text"
//           //     placeholder="Search for products..."
//           //     value={search}
//           //     onChange={(e) => setSearch(e.target.value)}
//           //   />
//           //   <button type="submit" className="search-button-mobile bg-blue-500 text-white rounded-lg p-2 ml-2">
//           //     Search
//           //   </button>
//           // </form>

//           <div className="bg-white/70 backdrop-blur-lg border-b-[3px] flex flex-wrap gap-0.01 w-full items-center ">
//         <div className="p-1.5 pr-1 lg:pr-90 w-fit">
//           <button
//             onClick={handleNavigate}
//             className="bg-orange-500 text-white  pr-2 'bg-gray-200 text-gray-700 lg:w-[10vw] lg:space-x-1 category-button">
//             <svg
//             className="w-4 h-4 ml-1"
//             fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//             {viewport ? null : <span>All Categories</span>}
//           </button>
//         </div>
//         <div>
//           <div className="md:flex justify-evenly lg:w-[20vw] md:w-20 gap-0.01 hidden">
//             {renderCategories()}
//           </div>

//         </div>
//         </div>
//         )
//         } */}
//       </div>
//       {/* Bottom Navbar */}
//       <div className="bg-white/70 backdrop-blur-lg border-b-[3px] flex flex-wrap gap-0.01 w-full items-center ">
//         <div className="p-1.5 pr-1 lg:pr-90 w-fit">
//           <button
//             onClick={handleNavigate}
//             className="bg-orange-500 text-white  pr-2 'bg-gray-200 text-gray-700 lg:w-[10vw] lg:space-x-1 category-button">
//             <svg
//             className="w-4 h-4 ml-1"
//             fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>

//            <span>All Categories</span>
//           </button>
//         </div>
//         <div>
//         <div className="flex items-center flex-wrap space-x-3 overflow-hidden w-100">
//           {renderCategories()}
//         </div>

//         </div>

//       </div>
//     </>
//   );
// };

  // export default Navbar;
  import React, { useEffect, useState } from "react";
  import Register from "../Auth/Register";
  import {
    FaUser,
    FaHeart,
    FaBox,
    FaSignOutAlt,
  } from "react-icons/fa";
  import { clearUser, signoutUser } from "../../../Redux/User/userSlice";
  import MobNavbar from "./MobileNavbar.js";
  import logo from "../../../logo.png";
  import { useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchCart} from '../../../Redux/Cart/cartSlice';
  import { fetchCategories } from "../../../Redux/Category/categoriesSlice.js"; // Adjust the path as necessary
  
  const Navbar = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [hoverDropdown, setHoverDropdown] = useState(false);
    const [hoverProfile, setHoverProfile] = useState(false); // Track profile hover state
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [search, setSearch] = useState("");
    const { items, status, fetchCartError } = useSelector((state) => state.cart);
    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);
  
    useEffect(() => {
      const fetchCartData = async () => {
        const action = await dispatch(fetchCart());
  
        if (fetchCart.rejected.match(action)) {
          if (action.payload === 'Forbidden') {
            dispatch(signoutUser()); // Sign out the user
            navigate('/login'); // Redirect to login page
          } else if (action.error?.message === '404') {
            alert('Cart is empty');
          }
        }
      };
  
      fetchCartData();
    }, [dispatch, navigate]);

    const authToken = localStorage.getItem("authToken");
    const isAuthenticated = !!authToken;
  
    const categories = useSelector((state) => state.categories.categories);
    const handleSide = (path) => {
      navigate(path);
    };
  
    const renderCategories = () => {
      return categories
        .filter((category) => category.level === 1)
        .map((category, i) => {
          if (i < 8) {
            return (
              <button
                onClick={() => handleSide(`/category/${category._id}`)}
                className=" border-none focus:border-none ml-3"
              >
                {category.name.toUpperCase()}
              </button>
              // < newCategoryButton key={i} category={category} isActive={false} icon={"https://cdn.builder.io/api/v1/image/assets/TEMP/228e6f8b412651ce85aa2a7c9e4a5702afd7a5e57f38741d4522f6d9c78f254e?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"} />
            );
          }
          return null;
        });
    };
  
    const handleNavigate = () => {
      navigate("/category");
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (search.trim() === "") return; // Check if the search field is empty
      navigate(`/search/${search}`);
    };
  
    const showCart = () => {
      navigate("/cart");
    };
  
    const handleProfileClick = () => {
      if (localStorage.getItem("role") === "ADMIN") {
        navigate("/admin");
      } else {
        // navigate("/myprofile/profile-information");
      }
    };
  
    const handleLogout = async () => {
      try {
        await dispatch(signoutUser()).unwrap(); // Dispatch the signoutUser thunk
        navigate("/"); // Navigate to the homepage after successful logout
      } catch (error) {
        console.error('Logout failed:', error); // Handle any potential errors
      }
    };
  
    const handleMouseEnter = (event) => {
      if (isAuthenticated) {
        const { top, left, height } = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({ top: top + height, left });
        setHoverProfile(true); // Track profile hover state
        setHoverDropdown(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (isAuthenticated) {
        setTimeout(() => {
          if (!hoverProfile && !hoverDropdown) {
            setHoverDropdown(false);
          }
        }, 100);
      }
    };
  
    const [viewport, setViewport] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 620);
  
    useEffect(() => {
      const handleResize = () => {
        setViewport(window.innerWidth < 620);
        setIsMobile(window.innerWidth < 620);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    
    const handleLogoClick = () => {
      navigate('/');
    };
    
    function CategoryButton({ category, isActive,icon }) {
      return (
              // <button
              //   onClick={() => handleSide(`/category/${category._id}`)}
              //   className=" border-none focus:border-none ml-3"
              // >
              //   {category.name.toUpperCase()}
              // </button>
        <div onClick={() => handleSide(`/category/${category._id}`)} className={`flex flex-col justify-center px-3.5 py-1 hover:bg-orange-200 ${isActive ? 'text-white bg-orange-600' : 'bg-slate-100'} rounded-2xl`}>
          <div className="flex flex-col w-full">
            <div className="flex gap-1.5 items-center justify-center">
              <div className="text-sm">{category.name}</div>
              <img loading="lazy" src='https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&' alt="" className="object-contain shrink-0 aspect-square w-[18px]" />
            </div>
          </div>
        </div>
      );
    }

    function newCategoryButton({ category, isActive, icon }) {
      return (
              // <button
              //   onClick={() => handleSide(`/category/${category._id}`)}
              //   className=" border-none focus:border-none ml-3"
              // >
              //   {category.name.toUpperCase()}
              // </button>

        <div onClick={() => handleSide(`/category/${category._id}`)} className={`flex flex-col justify-center px-3.5 py-1 hover:bg-orange-200 ${isActive ? 'text-white bg-orange-600' : 'bg-slate-100'} rounded-2xl`}>
          <div className="flex flex-col w-full">
            <div className="flex gap-1.5 items-center justify-center">
              <div className="text-sm">{category.name.toUpperCase()}</div>
              <img loading="lazy" src={icon} alt="" className="object-contain shrink-0 aspect-square w-[18px]" />
            </div>
          </div>
        </div>
      );
    }
  
  
  const categoriesnew = [
    { name: 'Groceries', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/228e6f8b412651ce85aa2a7c9e4a5702afd7a5e57f38741d4522f6d9c78f254e?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: true },
    { name: 'Premium Fruits', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Home & Kitchen', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Fashion', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Electronics', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Beauty', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Sports, Toys & Luggage', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
    { name: 'Home Improvement', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/575dc8eff964a20c01b160c32196fd09287c3a968090178589e005619c83bcdb?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&', isActive: false },
  ];
  
  const navclasses = viewport ? ("flex items-center z-10 flex-col pt-2  mt-2 pb-2 mr-0  w-full max-md:max-w-full") : ("flex items-center z-10 flex-col pt-2 bg-white mt-2 pb-2 mr-0  w-full max-md:max-w-full") 

  function CategoryNavigation() {
    return (
      <nav className={navclasses}>
        <div className="flex gap-4 self-center items-center justify-center w-full">
        <div className="border-r-[3px] p-2 pr-5 lg:pr-16 w-fit">
               <button
                  onClick={handleNavigate}
                  className="flex items-center space-x-1 text-zinc-700"
                >
                  <svg
                    className={`w-6 h-6 ${viewport ? 'text-white' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                  {viewport ? (
          null
        ) : (  <span>All Categories</span>)}
                </button>
              </div>
              { viewport ? ( <div className="flex flex-wrap gap-3.5 w-full max-md:max-w-full">
                            <SearchBar />
                            {/* <IconGroup /> */}
                            <nav className="flex gap-5 items-center my-auto min-h-[20px]">
                              <div className="flex gap-5 justify-center items-center self-stretch my-auto">
                                
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6e35fd02649f6c904ed904cbf3b99078bbe679fe3605c1ed989c6af26f540c8?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                                    alt="likes-icon"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                                  />
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1996a1c43d30a0c21a9c2200ade3f29391248873a00763da09e06366bcc71a84?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                                    alt="cart-icon"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                                    onClick={showCart}
                                  />
                                
                                {isAuthenticated ? (
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/039136c19993f3461bbc06066417366a3b5f3aafdc381925c95b93a52ee67068?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                                    alt="profile-icon"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                  />
                                  ) : (
                                    <button
                                      onClick={() => setShowModal(true)}
                                      className="text-orange-700 font-medium px-2 py-2 bg-white rounded-md"
                                    >
                                  Register
                                    </button>
                                  )}
                                  <Register showModal={showModal} setShowModal={setShowModal} />
                                  {hoverDropdown && (
                                      <div
                                        className="fixed bg-white shadow-lg space-y-2 w-fit border-[1px] border-gray-200 rounded-md z-[1000]"
                                        style={{ top: dropdownPosition.top }}
                                        onMouseEnter={() => setHoverDropdown(true)}
                                        onMouseLeave={() => setHoverDropdown(false)}
                                      >
                                        <button
                                          onClick={() => navigate('/myprofile/profile-information')}
                                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                        >
                                          <FaUser className="mr-2" />
                                          My Profile
                                        </button>
                                        <button
                                          onClick={() => navigate('/myprofile/likes')}
                                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                        >
                                          <FaHeart className="mr-2" />
                                          Wishlist
                                        </button>
                                        <button
                                          onClick={() => navigate('/myprofile/orders')}
                                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                        >
                                          <FaBox className="mr-2" />
                                          Orders
                                        </button>
                                        <button
                                          onClick={handleLogout}
                                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                        >
                                          <FaSignOutAlt className="mr-2" />
                                          Logout
                                        </button>
                                      </div>
                                    )}
                                  
                              </div>
                            </nav>
                          </div> 
          ) : null }
              <div >
                <div className="lg:flex gap-2 flex-wrap justify-evenly  md:w-100 hidden">
                {categories.filter((category) => category.level === 1).slice(0,7).map((category, index) => (
            <CategoryButton key={index} category={category} />
            // < newCategoryButton key={index} category={category} isActive={false} />
          ))}
                </div>
                
       
              </div>
          
          
          </div>
          
          
        
        {/* <div className="mt-4 w-full min-h-0 bg-gray-200 border border-gray-200 border-solid max-md:max-w-full" /> */}
      </nav>
    );
  }

  function SearchBar() {
    return (
      <form onSubmit={handleSearch} className="flex lg:block flex-col grow shrink-0 justify-center items-start px-3 py-1 text-sm leading-none text-right rounded-xl basis-0 bg-slate-100 text-stone-500 md:w-[507px] h-auto max-md:pr-5 max-md:max-w-full">
        <div className="flex items-center w-full h-fit min-h-[8px]">
          <button type="submit">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/99f489e1b79d5739e5672ea85b3334c7c95166c556f16f5b9bc5d5475ab92174?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&" alt="" className="object-contain shrink-0 aspect-square w-[18px]" />
          </button>
          {/* <label htmlFor="searchInput" className="sr-only w-full">Search essentials, groceries and more...</label> */}
          <input
            type="text"
            // id="searchInput"
            placeholder="Search essentials, groceries and more..."
            className="bg-transparent w-full border-none outline-none"
            onChange={(e) => setSearch(e.target.value)}
            required
            value={search}
          />
        </div>
      </form>
    );
  }
  
    const icons = [
      { src: "", alt: "Icon 1" },
      { src: "", alt: "Icon 2" },
    ];

    const apalbajarlogoclasses = viewport ? "h-full py-2" : "h-full px-8 py-3"
  
  
    return (
      // <>
   
      //     <div className="shadow-lg overflow-hidden relative">
      //       {/* Top Navbar */}
      //       <div className="bg-white p-4 border-b-[2px] flex items-center justify-between">
      //         <a href="/" className="flex items-center space-x-4">
      //           <img
      //             src={logo}
      //             alt="Logo"
      //             className="h-10"
      //             crossOrigin="anonymous"
      //           />
      //           <h2 className="text-black text-xl ml-[-12px] ">Aapla <span className="text-red-500">Bajar</span></h2> 
      //         </a>
      //         <div className="md:flex items-center hidden ">
      //           <form onSubmit={handleSearch}>
      //             <input
      //               type="search"
      //               placeholder="Search for Biscuits"
      //               className="border-[2px] border-zinc-300 rounded-l-md shadow-md p-2 w-[40vw] lg:w-[35vw] dark:bg-white dark:text-black"
      //               onChange={(e) => setSearch(e.target.value)}
      //               required
      //               value={search}
      //             />
      //             <button
      //               type="submit"
      //               className="bg-blue-500 border-[2px] border-blue-500 text-white p-2 rounded-r-lg font-sans"
      //             >
      //               SEARCH
      //             </button>
      //           </form>
      //         </div>
      //         <div className="flex lg:space-x-12">
      //           <div className="relative">
      //             <div
      //               className="flex items-center space-x-2 rounded-md p-2 border-[1px] border-none"
      //               onMouseEnter={handleMouseEnter}
      //               onMouseLeave={handleMouseLeave}
      //             >
      //               <svg
      //                 className="w-6 h-6 text-zinc-700 border-zinc-700 border-[2px] bg-white rounded-xl"
      //                 fill="none"
      //                 stroke="currentColor"
      //                 viewBox="0 0 24 24"
      //                 xmlns="http://www.w3.org/2000/svg"
      //               >
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth="2"
      //                   d="M5.121 17.804A8.966 8.966 0 0112 15c2.485 0 4.735.994 6.379 2.621M15 10a3 3 0 11-6 0 3 3 0 016 0z"
      //                 ></path>
      //               </svg>
      //               {isAuthenticated ? (
      //            <span>
                 
      //                   <svg
      //                     className="w-4 h-4 ml-1"
      //                     fill="none"
      //                     stroke="currentColor"
      //                     viewBox="0 0 24 24"
      //                     xmlns="http://www.w3.org/2000/svg"
      //                   >
      //                     <path
      //                       strokeLinecap="round"
      //                       strokeLinejoin="round"
      //                       strokeWidth="2"
      //                       d="M19 9l-7 7-7-7"
      //                     ></path>
      //                   </svg>
      //                   </span>
      //               ) : (
      //                 <button
      //                   onClick={() => setShowModal(true)}
      //                   className="text-black font-medium"
      //                 >
      //                Register
      //                 </button>
      //               )}
      //               <Register showModal={showModal} setShowModal={setShowModal} />
      //             </div>
      //             {hoverDropdown && (
      //               <div
      //                 className="fixed bg-white shadow-lg space-y-2 w-fit border-[1px] border-gray-200 rounded-md z-[1000]"
      //                 style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
      //                 onMouseEnter={() => setHoverDropdown(true)}
      //                 onMouseLeave={() => setHoverDropdown(false)}
      //               >
      //                 <button
      //                   onClick={() => navigate('/myprofile/profile-information')}
      //                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      //                 >
      //                   <FaUser className="mr-2" />
      //                   My Profile
      //                 </button>
      //                 <button
      //                   onClick={() => navigate('/myprofile/likes')}
      //                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      //                 >
      //                   <FaHeart className="mr-2" />
      //                   Wishlist
      //                 </button>
      //                 <button
      //                   onClick={() => navigate('/myprofile/orders')}
      //                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      //                 >
      //                   <FaBox className="mr-2" />
      //                   Orders
      //                 </button>
      //                 <button
      //                   onClick={handleLogout}
      //                   className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      //                 >
      //                   <FaSignOutAlt className="mr-2" />
      //                   Logout
      //                 </button>
      //               </div>
      //             )}
      //           </div>
      //           <div className="flex items-center ml-4 lg:space-x-2">
      //          <button onClick={showCart}>
      //               <svg
      //                 className="w-8 h-8 text-blue-500"
      //                 fill="none"
      //                 stroke="currentColor"
      //                 viewBox="0 0 24 24"
      //                 xmlns="http://www.w3.org/2000/svg"
      //               >
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth="1"
      //                   d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
      //                 />
      //               </svg>
      //             </button>   <sup className="text-bold px-2 rounded-full bg-blue-500 text-black text-lg" style={{marginTop:'-15px',marginLeft:'-5px'}}>{items&&items[0]&&items[0].length} </sup>
      //           </div>
      //         </div>
      //       </div>
      //       {/* Bottom Navbar */}
      //       <div className="bg-white/70 backdrop-blur-lg border-b-[2px] flex flex-wrap gap-2 w-full items-center lg:space-x-8">
      //         <div className="border-r-[3px] p-2 pr-5 lg:pr-16 w-fit">
      //           <button
      //             onClick={handleNavigate}
      //             className="flex items-center space-x-1 text-zinc-700"
      //           >
      //             <svg
      //               className="w-6 h-6"
      //               fill="none"
      //               stroke="currentColor"
      //               viewBox="0 0 24 24"
      //               xmlns="http://www.w3.org/2000/svg"
      //             >
      //               <path
      //                 strokeLinecap="round"
      //                 strokeLinejoin="round"
      //                 strokeWidth="2"
      //                 d="M4 6h16M4 12h16m-7 6h7"
      //               ></path>
      //             </svg>
      //             {viewport ? (
      //     null
      //   ) : (  <span>All Categories</span>)}
      //           </button>
      //         </div>
      //         <div >
      //           <div className="md:flex justify-evenly lg:w-[60vw] md:w-100 hidden">
      //           {renderCategories()}
      //           </div>
      //           <div className="md:hidden items-center flex ">
      //           <form onSubmit={handleSearch} className="w-100%">
      //             <input
      //               type="search"
      //               placeholder="Search for Biscuits"
      //               className="border-[2px] border-zinc-300 rounded-l-md shadow-md p-2 w-[56vw] dark:bg-white dark:text-black"
      //               onChange={(e) => setSearch(e.target.value)}
      //               required
      //               value={search}
      //             />
      //             <button
      //               type="submit"
      //               className="bg-blue-500 border-[2px] border-blue-500 text-white p-2 rounded-r-lg font-sans w-fit"
      //             >
      //               SEARCH
      //             </button>
      //           </form>
      //         </div>
       
      //         </div>
        
      //       </div>
      //     </div>
      //   {/* )} */}
      // </>
    
      <>
      <header className="sticky top-0 left-0 right-0 flex flex-wrap justify-between items-center pt-2 w-full bg-orange-600 max-md:px-5 z-50 max-md:max-w-full">
      <div className={apalbajarlogoclasses} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      {/* <img src={logo} alt="Logo" className="h-10" crossOrigin="anonymous"/> */}
      <p className="font-bold text-white lg:text-2xl text-lg">
        Apala<span className="text-gray-600">Bajar</span>
      </p>
    </div>
        { viewport ? null : ( <div className="flex flex-wrap gap-3.5 px-8 w-fit max-md:max-w-full">
            <SearchBar />
            {/* <IconGroup /> */}
            <nav className="flex gap-5 items-center my-auto min-h-[20px]">
              <div className="flex gap-5 justify-center items-center self-stretch my-auto">
                
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6e35fd02649f6c904ed904cbf3b99078bbe679fe3605c1ed989c6af26f540c8?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                    alt="likes-icon"
                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1996a1c43d30a0c21a9c2200ade3f29391248873a00763da09e06366bcc71a84?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                    alt="cart-icon"
                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                    onClick={showCart}
                  />
                
                {isAuthenticated ? (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/039136c19993f3461bbc06066417366a3b5f3aafdc381925c95b93a52ee67068?apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b&"
                    alt="profile-icon"
                    className="object-contain shrink-0 self-stretch my-auto w-6 h-6 aspect-square"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-orange-700 font-medium px-2 py-2 bg-white rounded-md"
                    >
                  Register
                    </button>
                  )}
                  <Register showModal={showModal} setShowModal={setShowModal} />
                  {hoverDropdown && (
                      <div
                        className="fixed bg-white shadow-lg space-y-2 w-fit border-[1px] border-gray-200 rounded-md z-[1000]"
                        style={{ top: dropdownPosition.top }}
                        onMouseEnter={() => setHoverDropdown(true)}
                        onMouseLeave={() => setHoverDropdown(false)}
                      >
                        <button
                          onClick={() => navigate('/myprofile/profile-information')}
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          <FaUser className="mr-2" />
                          My Profile
                        </button>
                        <button
                          onClick={() => navigate('/myprofile/likes')}
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          <FaHeart className="mr-2" />
                          Wishlist
                        </button>
                        <button
                          onClick={() => navigate('/myprofile/orders')}
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          <FaBox className="mr-2" />
                          Orders
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          <FaSignOutAlt className="mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  
              </div>
            </nav>
          </div> 
          )}

       <CategoryNavigation /> 
           {/* <div className="bg-white/70 backdrop-blur-lg border-b-[2px] flex flex-wrap gap-2 w-full items-center lg:space-x-8">
             <div className="border-r-[3px] p-2 pr-5 lg:pr-16 w-fit">
               <button
                  onClick={handleNavigate}
                  className="flex items-center space-x-1 text-zinc-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                  {viewport ? (
          null
        ) : (  <span>All Categories</span>)}
                </button>
              </div>
              <div >
                <div className="md:flex justify-evenly lg:w-[60vw] md:w-100 hidden">
                {renderCategories()}
                </div>
                <div className="md:hidden items-center flex ">
                <form onSubmit={handleSearch} className="w-100%">
                  <input
                    type="search"
                    placeholder="Search for Biscuits"
                    className="border-[2px] border-zinc-300 rounded-l-md shadow-md p-2 w-[56vw] dark:bg-white dark:text-black"
                    onChange={(e) => setSearch(e.target.value)}
                    required
                    value={search}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 border-[2px] border-blue-500 text-white p-2 rounded-r-lg font-sans w-fit"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
       
              </div>
        
            </div> */}
        
      </header>
    </>
  );
};

export default Navbar;

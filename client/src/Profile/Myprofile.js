import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Navbar from '../customer/Components/Navbar/Navbar';
import ProfileInformation from './components/Profilemain/Profile';
import ManageAddresses from './components/Profilemain/profileAddress';
import PanCardInformation from './components/Profilemain/Pancard';
import GiftCards from './components/Wishlist/Giftcards';
import SavedUPI from './components/Payment/savedUPI';
import SavedCards from './components/Payment/SavedCards';
import MyCoupons from './components/Wishlist/Coupons';
import { MdOutlineDoubleArrow } from "react-icons/md";
import MyReviewsRatings from './components/Wishlist/myReviews';
import AllNotifications from './components/Wishlist/Notification';
import MyWishlist from './components/Wishlist/WishList';
import './Myprofile.css';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchUserById, signoutUser, updateUser } from '../Redux/User/userSlice';
import MyOrders from './components/Orders/MyOrders.js';

const Sidebar = ({ isOpen, onClose }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleImageClick = () => setIsEditing(true);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
      if (currentUser) {
        dispatch(updateUser({ id: currentUser._id, userData: formData }));
      }
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(signoutUser()).unwrap(); // Dispatch the signoutUser thunk
      navigate("/"); // Navigate to the homepage after successful logout
    } catch (error) {
      console.error('Logout failed:', error); // Handle any potential errors
    }
  };

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white shadow-md p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-1/5 z-30`}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl focus:outline-none"
        aria-label="Close sidebar"
      >
        ✖️
      </button>
      <div className="flex items-center space-x-4 p-4">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleImageClick}
        >
          <img
            src={currentUser?.profileImage || "https://m.media-amazon.com/images/I/41jLBhDISxL._AC_UF1000,1000_QL80_.jpg"}
            alt="User Avatar"
            className="rounded-full w-16 h-16 cursor-pointer"
          />
          {isHovering && (
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full"
              onClick={handleImageClick}
            >
              Edit
            </button>
          )}
        </div>
        <div>
          <p className="font-semibold">Hello,</p>
          <p className="font-semibold">{currentUser ? `${currentUser.userName} ` : 'User'}</p>
        </div>
      </div>
      {isEditing && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={(input) => input && input.click()}
        />
      )}
      <nav className="mt-4">
        <ul>
          <li className="hover:bg-zinc-200 p-2 rounded-md">
            <Link to="/myprofile/my-orders" className="flex items-center space-x-2" onClick={onClose}><span>📦</span><span>My Orders</span></Link>
          </li>
          <li className="mt-2">
            <p className="font-semibold text-zinc-600 p-2">Account Settings</p>
            <ul className="ml-4">
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/profile-information" className="flex items-center space-x-2" onClick={onClose}><span>👤</span><span>Profile Information</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/manage-addresses" className="flex items-center space-x-2" onClick={onClose}><span>🏠</span><span>Manage Addresses</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/pan-card-information" className="flex items-center space-x-2" onClick={onClose}><span>🆔</span><span>PAN Card Information</span></Link>
              </li>
            </ul>
          </li>
          <li className="mt-2">
            <p className="font-semibold text-zinc-600 p-2">Payments</p>
            <ul className="ml-4">
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/gift-cards" className="flex items-center space-x-2" onClick={onClose}><span>🎁</span><span>Gift Cards</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/saved-upi" className="flex items-center space-x-2" onClick={onClose}><span>💳</span><span>Saved UPI</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/saved-cards" className="flex items-center space-x-2" onClick={onClose}><span>💳</span><span>Saved Cards</span></Link>
              </li>
            </ul>
          </li>
          <li className="mt-2">
            <p className="font-semibold text-zinc-600 p-2">My Stuff</p>
            <ul className="ml-4">
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/my-coupons" className="flex items-center space-x-2" onClick={onClose}><span>🏷️</span><span>My Coupons</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/my-reviews-ratings" className="flex items-center space-x-2" onClick={onClose}><span>⭐</span><span>My Reviews & Ratings</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/all-notifications" className="flex items-center space-x-2" onClick={onClose}><span>🔔</span><span>All Notifications</span></Link>
              </li>
              <li className="hover:bg-zinc-200 p-2 rounded-md">
                <Link to="/myprofile/my-wishlist" className="flex items-center space-x-2" onClick={onClose}><span>❤️</span><span>My Wishlist</span></Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="mt-4 p-2">
        <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600" onClick={handleLogout}>Logout</button>
      </div>
      <div className="mt-4 p-2">
        <p className="text-zinc-600">Frequently Visited:</p>
        <ul className="ml-4">
          <li className="hover:text-green-500"><Link to="/myprofile/track-order" onClick={onClose}>Track Order</Link></li>
          <li className="hover:text-green-500"><Link to="/myprofile/recently-viewed" onClick={onClose}>Recently Viewed</Link></li>
        </ul>
      </div>
    </aside>
  );
};

const MyProfilePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-2 py-4 lg:ml-0">
      <button
            className="lg:hidden z-50 fixed mt-50  left-4 bg-blue-500 text-white p-2 rounded-md "
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MdOutlineDoubleArrow className='text-white'/>
          </button>
        <Routes>
          <Route path="profile-information" element={<ProfileInformation />} />
          <Route path="manage-addresses" element={<ManageAddresses />} />
          <Route path="pan-card-information" element={<PanCardInformation />} />
          <Route path="gift-cards" element={<GiftCards />} />
          <Route path="saved-upi" element={<SavedUPI />} />
          <Route path="saved-cards" element={<SavedCards />} />
          <Route path="my-coupons" element={<MyCoupons />} />
          <Route path="my-reviews-ratings" element={<MyReviewsRatings />} />
          <Route path="all-notifications" element={<AllNotifications />} />
          <Route path="my-wishlist" element={<MyWishlist />} />
          <Route path="my-orders" element={<MyOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyProfilePage;

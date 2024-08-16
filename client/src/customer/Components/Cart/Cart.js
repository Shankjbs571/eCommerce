import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import MobNavBar from '../Navbar/MobileNavbar';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaCircleInfo } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeFromCart, clearCart, updateCartQuantity, addQuantity } from '../../../Redux/Cart/cartSlice';
import { fetchCoupons } from '../../../Redux/Coupons/couponSlice';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


const CartItem = ({ unik, actualPrice, imageSrc, productName, price, savings, qty, decreaseQuantity, increaseQuantity, removeItem, prodid }) => {
  return (
    <tr className="border-b bg-white hover:bg-gray-50 transition-colors duration-300">
      <td className="py-4 px-4 flex items-center space-x-4">
        <img src={imageSrc} alt="Product Image" className="w-16 h-16 rounded-md shadow-md" />
        <div>
          <span className="bg-green-300 text-black text-xs font-semibold px-2.5 py-0.5 rounded-md inline-block mb-1">Home Delivery Only</span>
          <p className="text-base font-medium text-gray-700">{productName}</p>
        </div>
      </td>
      <td className="py-4 px-4 text-center text-gray-700">₹{actualPrice}</td>
      <td className="py-4 px-4 text-center text-gray-700">₹{price}</td>
      <td className="py-4 px-4 text-center font-bold text-green-600">₹{savings}</td>
      <td className="py-4 px-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button className="bg-blue-500 text-white w-8 h-8 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300" onClick={() => decreaseQuantity(unik)}>-</button>
          <input type="number" value={qty} readOnly min="1" className="w-12 text-center border border-gray-300 rounded-md shadow-sm" />
          <button className="bg-blue-500 text-white w-8 h-8 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300" onClick={() => increaseQuantity(prodid)}>+</button>
          <button className="text-red-500 hover:text-red-700 transition-colors duration-300" onClick={() => removeItem(unik)}>
            <BsFillTrashFill className="text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [priceSummary, setPriceSummary] = useState({ totalDiscountedPrice: 0, discount: 0, totalActualPrice: 0 });
  const { items, status, fetchCartError } = useSelector((state) => state.cart);
  const [viewport, setViewport] = useState(window.innerWidth < 620);
  const { coupons, status: couponsstatus } = useSelector((state) => state.coupons);
  const [showCouponOverlay, setShowCouponOverlay] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  useEffect(() => {
    if (items && items.length > 0 && items[0].length > 0) {
      const totalDiscountedPrice = items[0].reduce((acc, item) => {
        if (item.product) {
          return acc + item.product.discountedPrice * item.quantity;
        }
        return acc;
      }, 0);
      const totalActualPrice = items[0].reduce((acc, item) => {
        if (item.product) {
          return acc + item.product.price * item.quantity;
        }
        return acc;
      }, 0);
      const discount = totalActualPrice - totalDiscountedPrice;
      setPriceSummary({ totalDiscountedPrice, discount, totalActualPrice });
    }
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      setViewport(window.innerWidth < 620);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const resultAction = await dispatch(fetchCart());
      if (fetchCart.rejected.match(resultAction) && resultAction.payload && resultAction.payload.isUnauthorized) {
        navigate('/login');
      }
    };
    fetchCartItems();
  }, [dispatch, navigate]);

  const applyCoupon = () => {
    if (selectedCoupon) {
      console.log('Applying coupon:', selectedCoupon);
      setSelectedCoupon(null);
      setShowCouponOverlay(false);
    }
  };

  const handleAddToCart = async () => {
    const resultAction = await dispatch(fetchCart());
    if (fetchCart.rejected.match(resultAction) && resultAction.payload && resultAction.payload.isUnauthorized) {
      navigate('/login');
    }
  };

  const increaseQuantity = (id) => {
    const item = items[0].find(item => item._id === id);
    dispatch(addQuantity(id));
  };

  const decreaseQuantity = (id) => {
    const item = items[0].find(item => item._id === id);
    if (item.quantity > 1) {
      dispatch(updateCartQuantity({ productId: id, quantity: item.quantity - 1 }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    navigate('/checkout');
  };

  const clearCartItems = () => {
    dispatch(clearCart());
    setPriceSummary({ totalDiscountedPrice: 0, discount: 0, totalActualPrice: 0 });
  };

  if (!items || items.length === 0) {
    return <div>Loading....</div>;
  }

  return (

    <div className="min-h-screen bg-gray-50 ">
      <div>
       <Navbar/>
      </div>
      <div className="container mx-auto p-4 mt-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4">
            <h3 className="text-xs mb-4">
              <span className="text-green-500 font-semibold text-xm">Cart /</span> <span>Checkout</span> / Confirmation ({items[0].length} items)</h3>
            <div className="overflow-x-auto rounded-md  shadow-sm">
              <table className="min-w-full ">
                <thead className="bg-Orange-500">
                  <tr>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b">Product</th>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b">Price</th>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b">Aapla Bajar Price</th>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b">You Save</th>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b">No. of items</th>
                    <th className="py-2 bg-orange-200 px-2 sm:py-2 sm:px-4 border-b"></th>
                  </tr>
                </thead>
                <tbody className='bg-orange-500'>
                  {items[0].map(item => (
                    <CartItem className='object-cover'
                      key={item && item._id}
                      prodid={items && item && item.product && item.product._id}
                      unik={item._id}
                      imageSrc={items && item && item.product && item.product.imageUrl}
                      productName={items && item && item.product && item.product.title}
                      actualPrice={items && item && item.product && item.product.price * item.quantity}
                      price={items && item && item.product && item.product.discountedPrice * item.quantity}
                      savings={(items && item && item.product && item.product.price - item.product.discountedPrice) * item.quantity}
                      qty={item.quantity}
                      decreaseQuantity={decreaseQuantity}
                      increaseQuantity={increaseQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300" onClick={clearCartItems}>Remove all</button>
            </div>
          </div>
          <div className="w-full lg:w-1/4 lg:pl-4 mt-4 lg:mt-30">
            <div className="bg-orange-100 p-6 border rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Price Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Cart Total</span>
                <span className="font-semibold text-gray-800">₹ {priceSummary.totalDiscountedPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">You Saved</span>
                <span className="font-semibold text-green-600">₹  {priceSummary.discount}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="group relative">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition duration-300">
                    <span >Delivery Charge <FaCircleInfo /></span>
                  </button>
                  <div className="absolute left-0 bottom-8 hidden mt-2 p-3 text-sm text-white bg-black border border-gray-300 rounded-md shadow-lg w-64 group-hover:block">
                    <ul className="list-disc pl-4">
                      <li>Home Delivery : Flat Rs. 40</li>
                      <li>Pick Up Point : Free Delivery</li>
                    </ul>
                  </div>
                </div>
                <span className="text-red-500 font-semibold">+ Extra</span>
              </div>

              {/* SHWOS HTHE AVAILABEL COUPONS */}
              <div className="relative">
                <button className="bg-green-500  w-full text-white px-4 mb-2 mt-4 py-2 rounded-md" onClick={() => setShowCouponOverlay(true)}>
                  Apply Coupons
                </button>

                {showCouponOverlay && (
                  <div className="fixed inset-0 flex z-50  items-center justify-center bg-gray-800 bg-opacity-60">
                    {/* <div className="bg-white p-4 rounded-md shadow-lg"> */}
                    <div className="w-1/2 pr-4 h-[500px] overflow-auto">
                      <div className="bg-green-100 p-8 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Select a Coupon</h2>
                        {couponsstatus === "succeeded" && coupons.map((coupon) => (
                          <div key={coupon._id} className="mb-4 p-2 bg-white rounded-lg items-center hover:scale-[1.02] transition duration-300">
                            <div className="flex justify-between p-4 bg-white rounded-lg items-center border-2 border-dashed border-gray-500">
                              <div className="flex items-center">
                                <div className="mr-3 text-blue-500">
                                  <LocalOfferIcon />
                                </div>
                                <div>
                                  <p className="text-gray-800 font-medium">{coupon.code}: {coupon.discountType === "percentage" ? `${coupon.discountValue}% off` : `${coupon.discountValue} off`}</p>
                                  <p className="text-gray-600">Expires on {new Date(coupon.expirationDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  checked={selectedCoupon === coupon._id}
                                  onChange={() => setSelectedCoupon(coupon.id)}
                                  disabled={selectedCoupon && selectedCoupon !== coupon._id}
                                  className="mr-2"
                                />
                                {/* <div className="mr-3 text-red-300 hover:text-red-500" onClick={(e) => handleDelete(coupon._id,e)}>
                                     <RemoveCircleIcon />
                                 </div> */}
                              </div>

                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end mt-4">
                          <button
                            className="bg-green-300 text-white px-4 py-2 hover:bg-green-600 rounded-md"
                            onClick={applyCoupon}
                            disabled={!selectedCoupon}
                          >
                            Apply
                          </button>
                          <button className="bg-red-300 text-white px-4 hover:bg-red-600 py-2 rounded-full ml-2" onClick={() => setShowCouponOverlay(false)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button 
              onClick={checkOut} 
              disabled={items[0].length === 0}
              className={`w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300 ${items[0].length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Proceed to Checkout
            </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
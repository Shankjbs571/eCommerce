import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/Cart/cartSlice';




const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return `${words.slice(0, wordLimit).join(' ')}...`;
  }
  return text;
};

const productCardClasses = "bg-white flex-col flex rounded-lg p-1 lg:p-4 mb-3 mt-5 lg:mx-4 border h-fit border-gray-500 lg:w-60 h-fit transition-transform duration-300 hover:scale-105";
const imageClasses = "w-full object-contain mb-2 h-28";
const buttonClass = (enabled) =>
  enabled
    ? "mt-1 sm:mt-2 text-green-600 text-xs sm:text-base"
    : "mt-1 sm:mt-2 text-green-600 text-xs sm:text-base cursor-not-allowed";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCartStatus, addToCartError } = useSelector((state) => state.cart);

  const handleAddToCart = async () => {

    const token = localStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login'); // Redirect to the login page if not logged in
      return;
    }
    const id = product._id;
    const resultAction = dispatch(addToCart(id));
    if (addToCart.rejected.match(resultAction) && resultAction.payload && resultAction.payload.isUnauthorized) {
      navigate('/login');
    }
  };

  return (
    <div key={product._id} className={`p-2 sm:p-4 rounded-lg bg-gray-100 hover:bg-orange-100 shadow-lg transition ease-in`}>
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.title} className={imageClasses} />
        <h3 className="text-sm sm:text-lg font-semibold">{truncateText(product.title, 2)}</h3>
      </Link>
      <div className="text-base sm:text-xl font-bold text-green-600">₹{product.discountedPrice}</div>
      <div className="text-xs sm:text-sm text-gray-500 line-through">₹ {product.price}</div>
      <div className="text-xs sm:text-sm text-zinc-500 mb-1 sm:mb2">
        {product.quantity > 0 ? 'Available' : 'Not Available'}
      </div>
      <button disabled={product.quantity < 1} onClick={handleAddToCart} className="mt-1 sm:mt-2 border border-solid border-green-600 rounded-lg py-1 px-2 hover:bg-green-600 hover:text-white  text-green-600 text-xs sm:text-base">Add to Cart</button>
    </div>
        
    // <div className={productCardClasses}>
    //   <div className="h-1/2">
    //     <Link to={`/product/${product._id}`}>
    //       <img
    //         className={imageClasses}
    //         src={product.imageUrl}
    //         alt="Product Image"
    //       />
    //       <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
    //         {product.title}
    //       </h3>
    //     </Link>
    //   </div>
    //   <div className="h-1/2">
    //     <div className="flex justify-between text-xs sm:text-sm text-zinc-500 mb-1 sm:mb-2">
    //       <div className='text-center'>
    //        <p> MRP </p><span className="line-through">{product.price}</span>{" "}
           
    //       </div>
    //       <div className='text-center'>
    //         <p>Aapla Bajar price{" "}</p>
    //         <span className="font-semibold">{product.discountedPrice}</span>
    //       </div>
    //     </div>
    //     <div className="text-blue-400 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
    //       {product.discountedPrice}% off
    //     </div>
    //     <div className="text-xs sm:text-sm text-zinc-500 mb-1 sm:mb2">
    //       {product.quantity > 0 ? 'Available' : 'Not Available'}
    //     </div>
    //     <div className="flex justify-center">
    //       <button
    //         className={buttonClass(product.quantity > 1)}
    //         disabled={product.quantity < 1}
    //         onClick={handleAddToCart}
    //       >
    //         ADD TO CART
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;

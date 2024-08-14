import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { fetchOrders } from '../../../Redux/Order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import order from './noorder.webp';

const MyOrders = () => {
  const dispatch = useDispatch();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { orders, status, error } = useSelector((state) => state.orders || {});

  useEffect(() => {
    dispatch(fetchOrders())
      .then((response) => {
        console.log('Fetch Orders Response:', response);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (status === 'succeeded' && (!orders || orders.length === 0)) {
    return <div className='flex flex-col justify-center items-center min-h-screen'>
    <img src={order} alt="no order" className='w-[600px]'/>
    <p className='text-5xl text-gray-400 font-bold text-center p-4'>No Order Found!</p>
  </div>
  }

  const handleToggle = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white text-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search your orders here"
          className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring focus:ring-orange-500"
        />
      </div>
      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`p-4 rounded-lg ${
                order.orderStatus === 'pending' ? 'bg-green-200' : 'bg-orange-200'
              } shadow-md border border-zinc-200`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-lg font-semibold">Order ID: {order._id}</h2>
                <button
                  onClick={() => handleToggle(order._id)}
                  className="text-orange-500"
                >
                  {expandedOrderId === order._id ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </button>
              </div>
              <p className="text-2xs sm:text-sm text-zinc-600">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-2xs sm:text-sm text-zinc-600">
                Payment Method: {order.paymentDetails.paymentMethod}
              </p>
              <p className="text-2xs sm:text-sm text-zinc-600">
                Order Status: {order.orderStatus}
              </p>
              <p className="text-2xs sm:text-sm text-zinc-600">
                Total Price: ₹{order.totalPrice}
              </p>
              {expandedOrderId === order._id && (
                <div className="mt-4 space-y-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 bg-white rounded-lg shadow-md"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-10 h-10 sm:w-20 sm:h-20 rounded-lg"
                        />
                        <div className="ml-4">
                          <h3 className="text-sm sm:text-lg font-semibold">
                            {item.product.title}
                          </h3>
                          <p className="text-2xs sm:text-sm text-zinc-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-2xs sm:text-sm text-zinc-600">
                            Price: ₹{item.price} (Discounted: ₹{item.discountedPrice})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No orders available</div>
      )}
    </div>
  );
};

export default MyOrders;

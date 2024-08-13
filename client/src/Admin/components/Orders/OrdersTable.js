import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAdmin } from '../../../Redux/Order/orderSlice';
import OrderDetailsPopup from './OrderDetailsPopup'; 

const sharedClasses = {
  primaryButton: 'bg-primary border-[2px] border-gray-600 text-primary-foreground px-4 py-2 rounded-lg flex items-center',
  tableCell: 'p-4 text-left',
  actionButton: 'text-blue-500 px-2',
  editButton: 'text-green-500',
  deleteButton: 'text-red-500 px-2',
};

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { adminOrders, status, error } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Paging states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of orders per page

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const handleProductClick = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedOrder(null);
  };

  const statusStyles = {
    pending: ' text-yellow-500 font-semibold',
    delivered: ' text-green-500 font-semibold',
    cancelled: ' text-red-500 font-semibold',
  };
  
  const getStatusClass = (status) => statusStyles[status.toLowerCase()] || '';

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the orders array to show only the current page's orders
  const paginatedOrders = adminOrders.slice(startIndex, endIndex);

  const totalPages = Math.ceil(adminOrders.length / pageSize);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white mx-5 my-8 rounded-lg text-card-foreground">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Order List</h1>
        <button className={sharedClasses.primaryButton}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
          </svg>
          Export all orders
        </button>
      </div>
      <div className="mb-16">
        <input type="text" placeholder="Search here..." className="w-full p-2 border rounded-lg bg-input text-foreground" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-secondary-foreground">
              <th className={sharedClasses.tableCell}>Order ID</th>
              <th className={sharedClasses.tableCell}>User Name</th>
              <th className={sharedClasses.tableCell}>Price</th>
              <th className={sharedClasses.tableCell}>Quantity</th>
              <th className={sharedClasses.tableCell}>Payment</th>
              <th className={sharedClasses.tableCell}>Status</th>
              <th className={sharedClasses.tableCell}>Tracking</th>
              <th className={sharedClasses.tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">No orders found</td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-100 transition duration-200">
                  <td className='p-4 text-left font-semibold hover:text-blue-500 cursor-pointer' onClick={() => handleProductClick(order)}>{order._id}</td>
                  <td className={sharedClasses.tableCell}>{order.user.firstName || 'Unknown'} {order.user.lastName || ''}</td>
                  <td className={sharedClasses.tableCell}>₹ {order.totalPrice}</td>
                  <td className={sharedClasses.tableCell}>{order.orderItems.length}</td>
                  <td className={sharedClasses.tableCell}>{order.paymentDetails.paymentMethod}</td>
                  <td className={`${sharedClasses.tableCell} ${getStatusClass(order.orderStatus)}`}> {order.orderStatus}</td>
                  <td className={sharedClasses.tableCell}>
                    <button className="bg-accent text-accent-foreground px-2 py-1 rounded">Track</button>
                  </td>
                  <td className={sharedClasses.tableCell}>
                    <button className={sharedClasses.actionButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55 4.55a2.5 2.5 0 01-3.6 3.6L11 14.6V10h4zM4 4a2 2 0 100 4 2 2 0 100-4zm0 12a2 2 0 100 4 2 2 0 100-4zm12 4a2 2 0 100 4 2 2 0 100-4zm0-16a2 2 0 100 4 2 2 0 100-4z" />
                      </svg>
                    </button>
                    <button className={sharedClasses.editButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 4.232a1.5 1.5 0 012.122 0l1.768 1.768a1.5 1.5 0 010 2.122l-10 10a1.5 1.5 0 01-.667.384l-5 1.5a.5.5 0 01-.632-.632l1.5-5a1.5 1.5 0 01.384-.667l10-10z" />
                      </svg>
                    </button>
                    <button className={sharedClasses.deleteButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5-3V3h4v1m4 0H6m13 0a2 2 0 00-2-2h-1a2 2 0 00-2-2h-4a2 2 0 00-2 2H5a2 2 0 00-2 2h16z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-12">
        <span className='text-xs'>Showing {paginatedOrders.length} of {adminOrders.length} entries</span>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 border rounded-lg" 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index + 1} 
              className={`px-3 py-1 border rounded-lg ${currentPage === index + 1 ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="px-3 py-1 border rounded-lg" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {isPopupOpen && selectedOrder && (
        <OrderDetailsPopup order={selectedOrder} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default OrdersTable;

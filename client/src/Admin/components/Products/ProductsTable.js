import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, updateProduct } from "../../../Redux/Product/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProductModal from "./UpdateProductModal"; // Import the modal component

const ProductTable = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const { products, status } = productsState || {};

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Adjust the number of products per page here

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then((response) => {
      if (response.error) {
        toast.error("Failed to delete product");
      } else {
        toast.success("Product deleted successfully");
      }
    });
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
    console.log(showUpdateModal);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedProduct(null);
  };

  const updateProductHandler = async (updatedProductData) => {
    dispatch(updateProduct({ id: selectedProduct._id, productData: updatedProductData }))
      .then((response) => {
        if (response.error) {
          toast.error("Failed to update product");
        } else {
          toast.success("Product updated successfully");
          closeUpdateModal();
        }
      });
    dispatch(fetchProducts());
  };

  // Function to truncate description
  const truncateDescription = (text, wordLimit) => {
    const words = text.split(' ');
    console.log(words);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };


  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg max-w-full mx-auto overflow-x-auto">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">All Grocery Products</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg w-[98vw]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discounted Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount Percent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-16 w-16 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {truncateDescription(product.description, 15)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.category?.name || "No Category"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.discountedPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.discountPercent}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <button onClick={() => handleUpdate(product)} className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4">
            {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((pageNumber) => (
              <button
                key={pageNumber + 1}
                className={`px-3 py-1 border rounded-md mx-1 ${currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'text-zinc-600 hover:bg-zinc-200'} transition duration-300`}
                onClick={() => paginate(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </>
      )}
      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={closeUpdateModal}
          onUpdate={updateProductHandler}
        />
      )}
    </div>
  );
};

export default ProductTable;

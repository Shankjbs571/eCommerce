

import React from 'react';
import { Link } from 'react-router-dom';

const OtherComponent = ({ advertisements, status }) => {
  return (
    <div className="p-8 bg-white rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Best Food and Beverages</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto py-2">
          {advertisements
            .filter(advertisement => advertisement.section === "Section 2")
            .map((advertisement, index) => (
              <Link to={`/product/${advertisement.product._id}`} key={index}>
                <div className="bg-white border rounded-lg shadow-lg flex-none w-60 sm:w-72 md:w-80 h-80 sm:h-72 md:h-80">
                  <img
                    src={advertisement.imageUrl}
                    alt={advertisement.title}
                    className="w-full h-25 sm:h-48 transform hover:scale-105 transition duration-300 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold sm:text-lg">{advertisement.title}</h3>
                    <p className="text-green-600 text-xs sm:text-sm">{advertisement.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {advertisements.filter(advertisement => advertisement.section === "Section 2").length > 4 && (
          <div className="text-center mt-4">
            <Link to="/all-food-and-beverages" className="bg-orange-500 text-white py-2 px-4 rounded-lg">
              View All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherComponent;

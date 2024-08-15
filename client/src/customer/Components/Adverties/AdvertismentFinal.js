import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function AdvertismentFinal() {
    return (
        <div className="flex w-full py-10 flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/4 px-20 py-5">
                <ul className="space-y-4">
                    {[
                        "Woman’s Fashion",
                        "Men’s Fashion",
                        "Electronics",
                        "Home & Lifestyle",
                        "Medicine",
                        "Sports & Outdoor",
                        "Baby’s & Toys",
                        "Groceries & Pets",
                        "Health & Beauty",
                    ].map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center text-lg text-gray-700 hover:text-orange-500 cursor-pointer"
                        >
                            {item}
                            {(item === "Woman’s Fashion" || item === "Men’s Fashion" || item === "Electronics") && (
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="ml-7"
                                    style={{ color: "#FFA900" }}
                                />
                            )}
                            
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex flex-grow mx-2 sm:mx-5 relative bg-black text-white rounded-lg shadow-lg p-8 items-center justify-center">
                <div className="text-center z-10">
                    <p className="text-sm text-gray-300">iPhone 14 Series</p>
                    <h1 className="text-3xl font-bold mt-2">Up to 10% off Voucher</h1>
                    <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                        Shop Now →
                    </button>
                </div>
                <div className="absolute inset-0 right-0 z-0">
                    <img
                        src="https://img.pikbest.com/wp/202405/sleek-3d-render-of-geometric-cosmetic-products-on-a-black-podium-against-dark-background_9834269.jpg!sw800"
                        alt="iPhone 14"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdvertismentFinal;

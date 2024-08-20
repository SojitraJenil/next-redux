import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProduct,
  addProduct,
  fetchSingleProduct,
} from "../redux/slices/productSlice";
import { RootState } from "../redux/reducers";
import { CardMedia } from "@mui/material";
import ProductCounter from "./product/ProductCounter ";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [cartedData, setCartedData] = useState<any[]>([]);
  const cartedProducts = useSelector(
    (state: RootState) => state.product.cartedProduct
  );
  const totalPrice = cartedData.reduce(
    (total, product) => total + product.price,
    0
  );

  console.log("totalPrice", totalPrice);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedData = await Promise.all(
          cartedProducts.map(async (id) => {
            const response = await axios.get(
              `https://dummyjson.com/products/${id}`
            );
            return response.data;
          })
        );
        setCartedData(fetchedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [cartedProducts]);

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 z-50 flex">
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={toggleSidebar}
          />
        </Transition.Child>
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                {cartedData &&
                  cartedData?.map((product: any) => (
                    <div
                      key={product.id}
                      className="bg-slate-100 h-[150px] p-2"
                    >
                      <div className="flex">
                        <CardMedia
                          component="img"
                          image={product.images[0]}
                          alt={product.title}
                          className="w-[100px] h-[100px] border border-1 border-black object-cover"
                        />
                        <div className="grid">
                          <div className="">
                            <div className="ps-3 text-sm">{product.id}</div>
                            <div className="ps-3 text-sm">{product.title}</div>
                            <div className="ps-3 text-sm">
                              $ {product.price}
                            </div>
                            <div className=""></div>
                          </div>
                          <ProductCounter initialPrice={19.99} />
                        </div>
                      </div>
                    </div>
                  ))}
              </nav>
            </div>
            <div className="px-4 py-3 bg-red-200 text-lg">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Sidebar;

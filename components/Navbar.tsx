import React, { useEffect, useRef, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Sidebar from "./Sidebar";

const pages = ["Product", "Todo", "Socket", "Prec", "React"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const CartedProduct = useSelector(
    (carted: RootState) => carted.product.cartedProduct
  );

  const previousLength = useRef(CartedProduct.length);

  useEffect(() => {
    if (CartedProduct.length > previousLength.current) {
      setSidebarOpen(true);
    }
    previousLength.current = CartedProduct.length;
  }, [CartedProduct]);

  const toggleNavMenu = () => setNavOpen(!navOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const closeNavMenu = () => setNavOpen(false);
  const closeUserMenu = () => setUserMenuOpen(false);

  return (
    <nav className="bg-red-800 sticky w-[100%] top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center text-white text-[22px]">
            Redux
          </div>

          <div className="hidden md:flex md:items-center">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => {
                  router.push(`/${page}`);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {page}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNavMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center">
            <div className="relative inline-block">
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-white focus:outline-none flex items-center"
              >
                <ShoppingCartIcon className="w-6 h-6" />
              </button>
              {CartedProduct.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-800 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {CartedProduct.length}
                </span>
              )}
            </div>
            {userMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  {settings.map((setting) => (
                    <a
                      key={setting}
                      href={`#${setting.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={closeUserMenu}
                    >
                      {setting}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <a
                key={page}
                href={`#${page}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                onClick={closeNavMenu}
              >
                {page}
              </a>
            ))}
          </div>
        </div>
      )}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
}

export default Navbar;

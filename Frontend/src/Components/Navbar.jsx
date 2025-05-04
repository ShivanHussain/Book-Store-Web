/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Dynamic nav items
  const navbarItems = [
    { label: 'Home', path: '/' },
    { label: 'AllBooks', path: '/allbooks' },
  ];

  if (isLoggedIn && role === 'user') {
    navbarItems.push({ label: 'Cart', path: '/cart' });
    navbarItems.push({ label: 'Profile', path: '/profile' });
  }

  if (isLoggedIn && role === 'admin') {
    navbarItems.push({ label: 'Admin Profile', path: '/profile' });
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-20 bg-slate-900 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="navbar flex justify-between items-center py-3">
          {/* Logo */}
          <div className="navbar-start flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="logo"
                className="h-10 w-10"
              />
              <span className="text-2xl md:text-3xl ml-2 font-bold text-blue-500">BookStore</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4 text-white">
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:text-blue-400 duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="navbar-end flex items-center space-x-2">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-block bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                >
                  SignUp
                </Link>
              </>
            )}

            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 rounded-box w-52"
              >
                {navbarItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="hover:text-blue-400 duration-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

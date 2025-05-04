/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Mobileview() {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {/* User View */}
      {role === 'user' && (
        <div className="w-full flex flex-col gap-2 items-center justify-between mt-4 lg:hidden px-4">
          <Link
            to="/profile"
            className="text-white font-semibold w-full py-2 text-center bg-slate-800 hover:bg-slate-700 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-white font-semibold w-full py-2 text-center bg-slate-800 hover:bg-slate-700 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-white font-semibold w-full py-2 text-center bg-slate-800 hover:bg-slate-700 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Admin View */}
      {role === 'admin' && (
        <div className="w-full flex flex-col gap-2 items-center justify-between mt-4 lg:hidden px-4">
          <Link
            to="/profile"
            className="text-white font-semibold w-full py-2 text-center bg-slate-800 hover:bg-slate-700 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/addBook"
            className="text-white font-semibold w-full py-2 text-center bg-slate-800 hover:bg-slate-700 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
}

export default Mobileview;

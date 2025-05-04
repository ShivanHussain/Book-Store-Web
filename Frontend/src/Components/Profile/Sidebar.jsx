/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from "../../Store/Authentication";
import { toast } from 'react-toastify';

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handlelogout = () => {
    dispatch(authenticationActions.logout());
    dispatch(authenticationActions.changeRole("user"));
    localStorage.clear();
    toast("Logout Successfully", {
              type: "success",
              position: "top-center",
              theme: "light",
              autoClose: 3000
            });
    history("/");
  }

  return (
    <>
      <div className="bg-slate-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-full w-full max-w-xs mx-auto">
        
        {/* Avatar + Name */}
        <div className="flex flex-col items-center justify-center text-center">
          <img src={data.avatar} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
          <p className="mt-3 text-xl text-white font-semibold">{data.username}</p>
          <p className="mt-1 text-sm text-white">{data.email}</p>
          <div className="w-full mt-4 h-[1px] bg-slate-500"></div>
        </div>

        {/* User Links */}
        {role === "user" && (
          <div className="w-full flex flex-col items-center justify-center mt-4 space-y-2">
            <Link
              to="/profile"
              className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
              Settings
            </Link>
          </div>
        )}

        {/* Admin Links */}
        {role === "admin" && (
          <div className="w-full flex flex-col items-center justify-center mt-4 space-y-2">
            <Link
              to="/profile"
              className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
              All Order
            </Link>
            <Link
              to="/profile/addBook"
              className="text-white font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300">
              Add Book
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="w-full mt-6 text-white font-semibold flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300"
          onClick={handlelogout}
        >
          Logout <IoLogOut className="ml-2" />
        </button>

      </div>
    </>
  )
}

export default Sidebar;

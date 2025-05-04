/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { BsFillCartXFill } from "react-icons/bs";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  // Fetch cart items once
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1000/cart/get-to-card", { headers });
      setCart(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  // Calculate total price whenever cart changes
  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  }, [cart]);

  // Delete cart item
  const handleDeleteCart = async (bookid) => {
    try {
      const res = await axios.put(`http://localhost:1000/cart/remove-to-card/${bookid}`, {}, { headers });
      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });
      // Refetch cart
      fetchCart();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <>
      <div className="bg-slate-900 mt-16 px-4 md:px-12 py-8 min-h-screen">

        {/* Loader */}
        {!cart ? (
          <div className="h-screen flex items-center justify-center"><Loader /></div>
        ) : null}

        {/* Empty Cart */}
        {cart && cart.length === 0 && (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center text-slate-300">
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Empty Cart</h1>
            <BsFillCartXFill className="text-6xl md:text-8xl" />
          </div>
        )}

        {/* Cart Items */}
        {cart && cart.length > 0 && (
          <div className="h-auto">
            <h1 className="text-3xl md:text-5xl font-semibold mb-8 text-slate-300">Your Cart</h1>

            {cart.map((item) => (
              <div key={item._id} className="w-full my-4 rounded flex flex-col md:flex-row p-4 justify-between items-center border border-slate-600 bg-slate-800 hover:bg-slate-700 transition-all">

                {/* Book Image */}
                <img src={item.url} alt="book" className="h-[25vh] md:h-[10vh] object-cover rounded" />

                {/* Book Details */}
                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4 flex-1">
                  <h1 className="text-xl md:text-2xl font-semibold text-slate-300">{item.title}</h1>
                  <p className="text-sm md:text-base mt-2 hidden lg:block text-slate-400">{item.desc.slice(0, 100)}...</p>
                  <p className="text-sm md:text-base mt-2 lg:hidden text-slate-400">{item.desc.slice(0, 65)}...</p>
                </div>

                {/* Price and Delete */}
                <div className="flex flex-col items-end justify-between w-full md:w-auto mt-4 md:mt-0 md:ml-4">
                  <h2 className="text-2xl font-semibold text-slate-300 mb-2">&#8377;&nbsp;{item.price}</h2>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-black rounded p-2"
                    onClick={() => handleDeleteCart(item._id)}
                  >
                    <MdDeleteForever className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total & Buttons */}
        {cart && cart.length > 0 && (
          <div className="mt-20 w-full flex justify-center md:justify-end">
            <div className="p-4 bg-slate-800 rounded w-full md:w-1/3">
              <h1 className="text-2xl md:text-3xl text-white font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-lg md:text-xl text-white">
                <h2>{cart.length} Books</h2>
                <h2>&#8377;&nbsp;{total}</h2>
              </div>
              <div className="w-full mt-4 flex flex-col gap-2">
                <Link
                  to="/allbooks"
                  className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 flex justify-center w-full font-semibold text-black"
                >
                  Add Book
                </Link>
                <Link
                  to="/Cartdetails"
                  className="bg-green-500 hover:bg-green-600 rounded px-4 py-2 flex justify-center w-full font-semibold text-black"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Cart;

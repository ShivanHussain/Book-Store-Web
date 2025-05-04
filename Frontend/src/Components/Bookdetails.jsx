// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "../Components/Loader/Loader.jsx";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

function Bookdetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setData(null);
      const res = await axios.get(`http://localhost:1000/book/book-id/${id}`);
      setData(res.data.data);
    };
    fetch();
  }, [id]); // added [id] dependency

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourites = async () => {
    const res = await axios.put("http://localhost:1000/favorate/add-book-favorates", {}, { headers });
    toast(res.data.message, {
      type: "success",
      position: "top-center",
      theme: "light",
      autoClose: 3000,
    });
  };

  const handleCart = async () => {
    const res = await axios.put("http://localhost:1000/cart/add-to-card", {}, { headers });
    toast(res.data.message, {
      type: "success",
      position: "top-center",
      theme: "light",
      autoClose: 3000,
    });
  };

  const deletebook = async () => {
    const res = await axios.delete("http://localhost:1000/book/delete-book", { headers });
    toast(res.data.message, {
      type: "success",
      position: "top-center",
      theme: "light",
      autoClose: 3000,
    });
    navigate("/allbooks");
  };

  return (
    <>
      {data ? (
        <div className="mt-16 px-4 md:px-12 py-8 bg-slate-900 flex flex-col lg:flex-row gap-8">

          {/* Left Side - Image + Buttons */}
          <div className="w-full lg:w-1/2 p-2 flex flex-col items-center">
            <div className="bg-slate-800 p-6 rounded w-full flex flex-col items-center">
              <img 
                src={data.url} 
                alt="book" 
                className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded object-contain" 
              />

              {isLoggedIn && role === "user" && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <button
                    className="bg-white rounded-full p-3 text-xl text-red-600 flex items-center hover:text-red-800 transition-all"
                    onClick={handleFavourites}
                  >
                    <FaHeart />
                    <span className="ms-2 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className="bg-white rounded-full p-3 text-xl text-blue-600 flex items-center hover:text-blue-800 transition-all"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-2 block lg:hidden">Add to Cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn && role === "admin" && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Link
                    to={`/updatebook/${id}`}
                    className="bg-white rounded-full p-3 text-xl text-green-600 flex items-center hover:text-green-800 transition-all"
                  >
                    <FaEdit />
                    <span className="ms-2 block lg:hidden">Edit Book</span>
                  </Link>
                  <button
                    className="bg-white rounded-full p-3 text-xl text-red-600 flex items-center hover:text-red-800 transition-all"
                    onClick={deletebook}
                  >
                    <MdDelete />
                    <span className="ms-2 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="p-4 w-full lg:w-1/2 border rounded-lg text-white space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold">{data.title}</h1>
            <p className="text-lg md:text-xl text-slate-300">by {data.author}</p>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">{data.desc}</p>
            <p className="flex items-center text-lg md:text-xl">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-yellow-400">
              Price: ₹ {data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

export default Bookdetails;

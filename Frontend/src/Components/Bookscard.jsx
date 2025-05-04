/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

function Bookscard({ Item, favourites }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
    bookid: Item._id,
  };

  const handleRemove = () => {
    const fetch = async () => {
      const res = await axios.put("http://localhost:1000/favorate/delete-book-favorates", {}, { headers });
      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 3000,
      });
    };
    fetch();
  };

  return (
    <>
      <div className="p-3">
        <div
          className="
            bg-slate-800 
            rounded-lg 
            shadow-md 
            hover:scale-105 
            transform 
            duration-300 
            border 
            flex 
            flex-col 
            w-full 
            max-w-[300px] 
            mx-auto 
            h-[500px] 
            justify-between
          "
        >
          {/* Book Image */}
          <figure className="rounded-t-lg overflow-hidden flex justify-center items-center bg-slate-700 p-2">
            <img
              src={Item.url}
              alt="Book"
              className="object-cover w-[200px] h-[250px] rounded-md"
            />
          </figure>

          {/* Book Content */}
          <div className="p-4 flex flex-col flex-1 justify-between">
            <Link to={`/bookdetails/${Item._id}`} className="flex flex-col flex-1">
              <h2 className="text-white text-lg font-semibold line-clamp-2 min-h-[48px]">{Item.title}</h2>
              <p className="mt-1 text-slate-300 text-sm line-clamp-1 min-h-[20px]">by {Item.author}</p>
            </Link>

            {/* Price + View button */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-white text-lg font-medium">&#8377;&nbsp;{Item.price}</div>
              <Link
                to={`/bookdetails/${Item._id}`}
                className="text-blue-400 text-sm font-medium hover:text-blue-600 transition"
              >
                View
              </Link>
            </div>

            {/* Remove Favourites Button */}
            {favourites && (
              <button
                className="mt-4 bg-red-500 text-white rounded-md py-2 px-4 text-sm hover:bg-red-600 transition"
                onClick={handleRemove}
              >
                Remove from Favourites
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookscard;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

function Orderhistory() {
  const [orderhis, setOrderhis] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/order/get-order-his", { headers });
      setOrderhis(res.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      <h1 className="flex font-semibold ml-4 text-3xl">Order History</h1>

      {!orderhis && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {orderhis && orderhis.length === 0 && (
        <div className="h-[80vh] p-4 text-slate-300">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-slate-600 mb-8">No order history</h1>
          </div>
        </div>
      )}

      {orderhis && orderhis.length > 0 && (
        <div className="h-full p-0 md:p-4 text-slate-200 mt-2">
          <h2 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center justify-center">
            Your Order History
          </h2>

          {/* Table Header (Desktop only) */}
          <div className="mt-4 bg-slate-800 w-full rounded py-2 px-4 gap-2 hidden md:flex">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-[5%]">Mode</div>
          </div>

          {orderhis.map((item, i) => (
            <div
              key={item._id}
              className="bg-slate-800 w-full rounded py-2 px-4 hover:bg-slate-700 hover:cursor-pointer mt-1 
              flex flex-col md:flex-row md:gap-4 gap-2"
            >
              {/* Sr No */}
              <div className="md:w-[3%] text-center">
                <h1>{i + 1}.</h1>
              </div>

              {/* Book title */}
              <div className="md:w-[22%]">
                <Link to={`view-book-details/${item.book._id}`} className="hover:text-blue-500 font-semibold">
                  {item.book.title}
                </Link>
              </div>

              {/* Description */}
              <div className="md:w-[45%] text-sm md:text-base">
                {item.book.desc.slice(0, 50)} ...
              </div>

              {/* Price */}
              <div className="md:w-[9%]">
                <h1>&#8377;&nbsp;{item.book.price}</h1>
              </div>

              {/* Status */}
              <div className="md:w-[16%]">
                {item.status === "Order placed" ? (
                  <div className="text-green-500 font-semibold">{item.status}</div>
                ) : item.status === "Canceled" ? (
                  <div className="text-red-500 font-semibold">{item.status}</div>
                ) : (
                  <div className="text-yellow-500 font-semibold">{item.status}</div>
                )}
              </div>

              {/* Mode */}
              <div className="md:w-[5%] hidden md:block">
                <h1 className="text-sm text-slate-200">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Orderhistory;

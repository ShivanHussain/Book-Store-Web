/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import { FaUser, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";
import Userdata from './Userdata';
import { toast } from 'react-toastify';

function Allorder() {
  const [orders, setOrders] = useState([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [userModalData, setUserModalData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:1000/order/get-order-all", { headers });
      setOrders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const submitStatusChange = async (orderId) => {
    if (!selectedStatus) {
      toast("Please select a status first", { type: "warning" });
      return;
    }

    try {
      const res = await axios.put(`http://localhost:1000/order/update-status/${orderId}`, { status: selectedStatus }, { headers });
      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 3000,
      });

      // Refetch updated orders
      fetchOrders();

      // Reset dropdown state
      setActiveOptionIndex(-1);
      setSelectedStatus("");
    } catch (error) {
      toast("Failed to update status", { type: "error" });
    }
  };

  const openUserModal = (userData) => {
    setUserModalData(userData);
    setUserModalVisible(true);
  };

  const closeUserModal = () => {
    setUserModalVisible(false);
    setUserModalData(null);
  };

  return (
    <>
      {!orders.length ? (
        <div className="h-full flex items-center justify-center"><Loader /></div>
      ) : (
        <div className="h-full p-2 md:p-4 text-slate-200 mt-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-4 flex items-center justify-center">
            All Orders
          </h2>

          {/* Table Header */}
          <div className="hidden md:flex bg-slate-800 w-full rounded py-2 px-4 gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-[5%]"><FaUser /></div>
          </div>

          {/* Orders List */}
          {orders.map((item, i) => (
            <div
              key={item._id}
              className="bg-slate-800 w-full rounded py-2 px-4 flex flex-col md:flex-row gap-2 md:gap-4 hover:bg-slate-700 hover:cursor-pointer mt-2"
            >
              {/* Sr. No */}
              <div className="md:w-[3%] text-center">{i + 1}.</div>

              {/* Book Title */}
              <div className="md:w-[22%]">
                <Link to={`/bookdetails/${item.book._id}`} className="hover:text-blue-500">
                  {item.book.title}
                </Link>
              </div>

              {/* Description */}
              <div className="hidden md:block md:w-[45%]">
                {item.book.desc.slice(0, 50)} ...
              </div>

              {/* Price */}
              <div className="md:w-[9%]">
                &#8377;&nbsp;{item.book.price}
              </div>

              {/* Status + Select */}
              <div className="md:w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300 font-semibold"
                  onClick={() => setActiveOptionIndex(activeOptionIndex === i ? -1 : i)}
                >
                  {item.status === "Order placed" ? (
                    <div className="text-green-500">{item.status}</div>
                  ) : item.status === "canceled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    <div className="text-yellow-500">{item.status}</div>
                  )}
                </button>

                {/* Dropdown */}
                {activeOptionIndex === i && (
                  <div className="flex mt-2 gap-2">
                    <select
                      name="status"
                      className="bg-slate-800 text-white rounded"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="">Select</option>
                      {["Order placed", "Out of delivery", "canceled"].map((status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-blue-700"
                      onClick={() => submitStatusChange(item._id)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>

              {/* User Info Button */}
              <div className="md:w-[5%]">
                <button
                  className="text-xl hover:text-blue-700"
                  onClick={() => openUserModal(item.user)}
                >
                  <IoMdOpen />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Data Modal */}
      {userModalData && (
        <Userdata
          userdiv={userModalVisible ? "visible" : "hidden"}
          userdivdata={userModalData}
          setUserDiv={(state) => {
            setUserModalVisible(state === "visible");
            if (state === "hidden") setUserModalData(null);
          }}
        />
      )}
    </>
  );
}

export default Allorder;

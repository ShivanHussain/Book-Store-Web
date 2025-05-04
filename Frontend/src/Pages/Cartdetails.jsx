/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cartdetails() {
  const [profile, setProfile] = useState();
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:1000/user/user-info", { headers });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // Fetch user cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/cart/get-to-card", { headers });
        setCart(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  // Calculate total amount
  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalAmount);
    }
  }, [cart]);

  // Place order
  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:1000/order/place-order", { order: cart }, { headers });
      toast.success(res.data.message, { position: "top-center", autoClose: 2000 });
      setTimeout(() => navigate("/profile/orderHistory"), 2000);
    } catch (err) {
      toast.error("Failed to place an order", { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <>
      <section className="mt-12">
        <div className="min-h-screen p-4 md:p-6 bg-slate-900 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-bold text-xl text-white mb-2">Cash On Delivery</h2>
              <p className="text-white mb-2 text-lg font-semibold">Total Price: &#8377;&nbsp;{total}</p>
              <p className="text-white mb-6 text-lg font-semibold">Items: {cart.length}&nbsp;Books</p>

              <div className="bg-slate-800 rounded shadow-lg p-4 mb-6">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-white">
                    <p className="font-bold text-lg mb-2">Personal Details</p>
                    <p className="font-semibold">Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-2">

                      <div className="text-white">
                        <label htmlFor="name" className="font-semibold">Full Name</label>
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          id="name"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="Full Name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="email" className="font-semibold">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          disabled
                          defaultValue={profile?.email}
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="text-white">
                        <label htmlFor="phone" className="font-semibold">Phone Number</label>
                        <input
                          {...register("phone", { required: true })}
                          type="number"
                          id="phone"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="+123 456 7890"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="address" className="font-semibold">Address / Street</label>
                        <input
                          {...register("address", { required: true })}
                          type="text"
                          id="address"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="Address"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="city" className="font-semibold">City</label>
                        <input
                          {...register("city", { required: true })}
                          type="text"
                          id="city"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="country" className="font-semibold">Country</label>
                        <input
                          {...register("country", { required: true })}
                          type="text"
                          id="country"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="Country"
                        />
                        {errors.country && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="state" className="font-semibold">State / Province</label>
                        <input
                          {...register("state", { required: true })}
                          type="text"
                          id="state"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="State"
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="text-white">
                        <label htmlFor="zipcode" className="font-semibold">Pincode</label>
                        <input
                          {...register("zipcode", { required: true })}
                          type="number"
                          id="zipcode"
                          className="h-10 mt-1 rounded px-4 w-full bg-slate-900"
                          placeholder="Zipcode"
                        />
                        {errors.zipcode && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                      </div>

                      <div className="md:col-span-2 flex items-center gap-2 text-white mt-2">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          id="terms"
                          className="form-checkbox"
                        />
                        <label htmlFor="terms" className="text-sm">
                          I agree to the <Link className="underline text-blue-500">Terms & Conditions</Link> and <Link className="underline text-blue-500">Shopping Policy</Link>.
                        </label>
                      </div>

                      <div className="md:col-span-2 text-right">
                        <button
                          disabled={!isChecked}
                          className={`mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Place Order
                        </button>
                      </div>

                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Cartdetails;

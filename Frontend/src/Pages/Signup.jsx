 /* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

function Signup() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      const { username, email, password, address } = values;
      if (!username || !email || !password || !address) {
        toast("All fields are mandatory", {
          type: "error",
          position: "top-center",
          theme: "light",
          autoClose: 3000
        });
        return;
      }

      const res = await axios.post(
        "http://localhost:1000/user/signup",
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });

      navigate("/login");

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.log(errorMsg);
      toast(errorMsg, {
        type: "error",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });
    }
  }

  return (
    <>
      <div className="mt-16 min-h-screen bg-slate-900 px-4 py-8 flex items-center justify-center">
        <div className="bg-slate-800 rounded-lg py-6 px-6 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3">
          <p className="text-white text-2xl font-semibold text-center">Sign Up</p>

          <div className="mt-6 space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-white">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full mt-2 bg-slate-900 text-white p-2 rounded-lg outline-none"
                id="username"
                name="username"
                required
                value={values.username}
                onChange={change}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-white">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 bg-slate-900 p-2 text-white rounded-lg outline-none"
                id="email"
                name="email"
                required
                value={values.email}
                onChange={change}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-white">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 bg-slate-900 p-2 text-white rounded-lg outline-none"
                id="password"
                name="password"
                required
                value={values.password}
                onChange={change}
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="text-white">Address</label>
              <textarea
                placeholder="Enter your address"
                rows="3"
                id="address"
                className="w-full bg-slate-900 p-2 text-white mt-2 rounded-lg outline-none"
                name="address"
                required
                value={values.address}
                onChange={change}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                onClick={submit}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Switch to Login */}
          <div className="mt-6">
            <span className="flex justify-center font-semibold text-white">Or</span>
            <p className="flex justify-center mt-4 text-white font-semibold">
              Already have an account? &nbsp;
              <a
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;

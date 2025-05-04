/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { authenticationActions } from '../Store/Authentication';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.email === "" || values.password === "") {
        toast("All fields are mandatory", {
          type: "error",
          position: "top-center",
          theme: "light",
          autoClose: 3000
        });
      } else {
        const res = await axios.post(
          "http://localhost:1000/user/signin",
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
        dispatch(authenticationActions.login());
        dispatch(authenticationActions.changeRole(res.data.role));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/profile");
      }
    } catch (err) {
      if (err.response) {
        toast(err.response.data.message, {
          type: "error",
          position: "top-center",
          theme: "light",
          autoClose: 3000
        });
      } else {
        console.log("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="bg-slate-800 rounded-lg py-8 px-6 w-full max-w-md md:max-w-lg lg:max-w-md shadow-lg">
          <p className="text-white text-2xl font-bold text-center">Login</p>
          <div className="mt-8">
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900 p-3 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                id="email"
                value={values.email}
                onChange={change}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-slate-900 p-3 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                id="password"
                value={values.password}
                onChange={change}
                required
              />
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all duration-300"
              onClick={submit}
            >
              Login
            </button>
          </div>

          {/* Or & Sign Up */}
          <div className="mt-6 text-center">
            <span className="block text-white font-semibold mb-4">Or</span>
            <p className="text-white font-semibold">
              Don't have an account?&nbsp;
              <a href="/signup" className="text-blue-500 hover:text-blue-700 underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

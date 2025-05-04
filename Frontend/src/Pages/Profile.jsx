/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Profile/Sidebar';
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import Mobileview from '../Components/Profile/Mobileview';

function Profile() {
  const [data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // 🔄 Fixed "Banner" ➡️ "Bearer"
  };

  useEffect(() => {
    const fetch = async () => {
      setData(null);
      try {
        const res = await axios.get("http://localhost:1000/user/user-info", { headers });
        setData(res.data);
      } catch (err) {
        console.log("Error fetching user data", err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="mt-16 bg-slate-900 px-4 py-8 md:px-8 lg:px-12 flex flex-col md:flex-row gap-6 text-white min-h-screen">
        {data ? (
          <>
            {/* Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              <Sidebar data={data} />
              {/* Show mobile view only on small screens */}
              <div className="block md:hidden mt-6">
                <Mobileview />
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <Outlet />
            </div>
          </>
        ) : (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;

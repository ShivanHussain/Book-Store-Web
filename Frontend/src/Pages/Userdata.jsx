/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';

function Userdata({ userdiv, userdivdata, setUserDiv }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
        userdiv === "visible" ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Modal Content */}
      <div className="bg-white text-black p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">User Info</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {userdivdata.username}</p>
          <p><strong>Email:</strong> {userdivdata.email}</p>
          <p><strong>Phone:</strong> {userdivdata.address}</p>
        </div>
        {/* Close Button */}
        <button
          onClick={() => setUserDiv("hidden")}
          className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Userdata;

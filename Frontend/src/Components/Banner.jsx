/* eslint-disable no-unused-vars */
import React from 'react';
import banner from "../../public/Banner.png";
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto bg-slate-900 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between py-10">

        {/* Left Text Block */}
        <div className="w-full md:w-1/2 order-2 md:order-1 mt-10 md:mt-0 text-white space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Hello, welcome here to learn something{" "}
            <span className="text-blue-500">new everyday!!!</span>
          </h1>

          <p className="text-lg md:text-2xl text-white leading-relaxed">
            Uncover captivating stories, enriching knowledge and endless inspiration in our curated collection of books.
          </p>

          <div className="mt-6">
            <Link 
              to="/allbooks" 
              className="text-lg font-semibold border px-8 py-3 rounded-full hover:text-blue-500 hover:border-blue-500 transition-all duration-300"
            >
              Discover more
            </Link>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center mt-10 md:mt-0">
          <img 
            src={banner} 
            alt="Banner" 
            className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

      </div>
    </>
  );
}

export default Banner;

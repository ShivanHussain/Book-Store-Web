/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'

function Aboutus() {
  return (
    <>
      <div className="mt-16 bg-slate-900 p-8 text-slate-200">
      <h1 className="font-bold text-white text-xl ml-4">About Us</h1>
            <p className="text-lg px-8 py-4 mt-4">
                Welcome to bookstore Web, your number one source for all things books. 
                We're dedicated to providing you the very best of literature, with an emphasis on 
                dependability, customer service, and uniqueness.
            </p>
            <p className="text-lg px-8 py-1">
                Founded in 2024, bookstore App has come a long way 
                from its beginnings in a Bareilly. When grap first started 
                out, their passion for reading drove them to do tons of research, so that Bookstore Web can offer you the world's most loved and best books. 
            </p>
            <p className="text-lg px-8 py-2">
                We now serve customers all over Bareilly , and are thrilled that we're able 
                to turn our passion into our own website.
            </p>
            <h2 className="font-semibold text-white text-xl ml-4 mt-4">Our Mission</h2>
            <p className="text-lg px-8 py-4">
                Our mission is to promote reading and provide a platform for book lovers to find 
                their next great read. We believe that books can change lives, and we are here to 
                help you discover your next favorite book.
            </p>
            <h2 className="font-semibold text-white text-xl ml-4 mt-4">Contact Us</h2>
            <p className="text-lg px-8 py-4 ">
                If you have any questions or comments, please don't hesitate to contact us at 
                <a href="/contact" className="link link-hover text-blue-500">&nbsp;&nbsp;info@yourbookstore.com</a>.
            </p>
      </div>
    </>
  )
}

export default Aboutus;
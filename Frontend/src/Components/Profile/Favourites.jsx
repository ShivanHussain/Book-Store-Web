/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Bookscard from '../Bookscard.jsx';
import { MdWorkspacePremium } from 'react-icons/md';

function Favourites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Banner ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:1000/favorate/get-book-favorates', { headers });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetch(); // initial call
  
    const interval = setInterval(fetch, 2000); // call every 5 seconds
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);
   // fix: empty dependency array to avoid infinite calls

  return (
    <>
      <h1 className="flex font-semibold ml-4 text-3xl mt-4 text-white">Favourites</h1>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <h3 className="font-semibold text-slate-300 text-xl">No such item</h3>
          <p className="flex items-center justify-center text-4xl text-blue-500 mt-2">
            <MdWorkspacePremium />
          </p>
        </div>
      ) : (
        <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-4">
          {data.map((item, i) => (
            <Bookscard Item={item} key={i} favourites={true} />
          ))}
        </div>
      )}
    </>
  );
}

export default Favourites;

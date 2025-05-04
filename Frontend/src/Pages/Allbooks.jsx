/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Bookscard from '../Components/Bookscard';
import Loader from "../Components/Loader/Loader.jsx";

function Allbooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:1000/book/all-book");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-slate-900 px-4 py-6 md:px-10 lg:px-20">
        <div className="mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold ml-2 md:ml-4">
            All Books
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center mt-32 md:mt-48">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-8 gap-4">
            {data.map((item) => (
              <div key={item._id}>
                <Bookscard Item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Allbooks;

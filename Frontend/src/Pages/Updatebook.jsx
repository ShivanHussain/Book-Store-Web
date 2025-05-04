/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Updatebook() {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      const { url, title, author, price, language, desc } = data;
      if (!url || !title || !author || !price || !language || !desc) {
        toast("All fields are mandatory", {
          type: "error",
          position: "top-center",
          theme: "light",
          autoClose: 3000
        });
        return;
      }

      const res = await axios.put("http://localhost:1000/book/update-book", data, { headers });

      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        language: "",
        desc: "",
      });

      toast(res.data.message, {
        type: "success",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });

      navigate("/allbooks");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong";
      toast(errMsg, {
        type: "error",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:1000/book/book-id/${id}`);
      setData(res.data.data);
    }
    fetch();
  }, []);

  return (
    <>
      <div className="min-h-screen p-4 md:p-16 bg-slate-900 mt-16 rounded">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8">Update Book</h1>

        <div className="p-6 md:p-8 bg-slate-800 rounded space-y-4">
          {/* Image URL */}
          <div>
            <label htmlFor="url" className="text-white">Image</label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
              placeholder="URL of image"
              name="url"
              id="url"
              required
              value={data.url}
              onChange={change}
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="text-white">Title of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
              placeholder="Title of book"
              name="title"
              id="title"
              required
              value={data.title}
              onChange={change}
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="text-white">Author of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
              placeholder="Author of book"
              name="author"
              id="author"
              required
              value={data.author}
              onChange={change}
            />
          </div>

          {/* Language and Price */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Language */}
            <div className="w-full md:w-1/2">
              <label htmlFor="language" className="text-white">Language</label>
              <input
                type="text"
                className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
                placeholder="Language"
                name="language"
                id="language"
                required
                value={data.language}
                onChange={change}
              />
            </div>

            {/* Price */}
            <div className="w-full md:w-1/2">
              <label htmlFor="price" className="text-white">Price</label>
              <input
                type="text"
                className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
                placeholder="Price"
                name="price"
                id="price"
                required
                value={data.price}
                onChange={change}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc" className="text-white">Description</label>
            <textarea
              className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
              placeholder="Description"
              name="desc"
              rows="5"
              id="desc"
              required
              value={data.desc}
              onChange={change}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center md:justify-start">
            <button
              className="bg-blue-700 px-4 py-2 rounded-lg text-white hover:bg-blue-500 transition-all duration-300"
              onClick={submit}
            >
              Update Book
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Updatebook;

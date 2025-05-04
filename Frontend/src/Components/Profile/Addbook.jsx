/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Addbook() {
  const navigate = useNavigate();
  
  
const headers = {
    id: localStorage.getItem("id"),
    authorization: `Banner ${localStorage.getItem("token")}`
};

  const [data , setData ] = useState({
    url:"",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  
const change = (e)=>{
    const { name , value } = e.target;
    setData({...data , [name]: value})
};


//console.log(data);

const submit = async () =>{
   try{
      if(
          data.url === ""||
          data.title === "" ||
          data.author === "" ||
          data.price === "" ||
          data.language === "" ||
          data.desc === ""
        ){
          toast("All fields are mendatory",{
            type: "error",
            position: "top-center",
            theme: "light",
            autoClose: 5000
          });

        }
       
        else{
          const res = await axios.post("http://localhost:1000/book/add-book",data,{ headers });
          setData({
            url: "",
            title: "",
            author: "",
            price: "",
            language: "",
            desc: "",
          }); 
          navigate("/allbooks");
          //console.log(res.data.message);

        toast(res.data.message, {
          type: "success",
          position: "top-center",
          theme: "light",
          autoClose: 3000
        });
            
        }
    }catch(err){
      toast(err.res.data.message,{
        type: "error",
        position: "top-center",
        theme: "light",
        autoClose: 3000
      });
    }
    
  }
  return (
    <>
   <div className="h-[100%] p-0 md:p-4 bg-slate-900">
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8 ">Add Book</h1>
      <form className="p-4 bg-slate-800 rounded apperance-none">
        <div className="">
          <label htmlFor="url" className="text-white">Image</label>
          <input type="text"
          className="w-full mt-2 bg-slate-900 text-white  p-2 outline-none rounded"
          placeholder="Enter the image URL"
          name="url"
          id="url"
          required
          value={data.url}
          //onChange={handleFileChange}
          onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="text-white">Title of book</label>
          <input type="text"
          className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
          placeholder="Title of book"
          name="title"
          id="title"
          required
          value={data.title}
          onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="author" className="text-white">Author of book</label>
          <input type="text"
          className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
          placeholder="Author of book"
          name="author"
          id="author"
          required
          value={data.author}
          onChange={change}
          />
        </div>

        <div className="mt-4 flex gap-6">
            <div className="w-3/6 ">
              <label htmlFor="language" className="text-white">Language</label>
              <input type="text"
              className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
              placeholder="Language"
              name="language"
              id="language"
              required
              value={data.language}
              onChange={change}
              />
            </div>

            <div className="w-3/6 ">
              <label htmlFor="pice" className="text-white">Price</label>
              <input type="text"
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

        
        <div className="mt-6">
          <label htmlFor="desc" className="text-white">Description</label>
          <textarea type="text"
          className="w-full mt-2 bg-slate-900 text-white p-2 outline-none rounded"
          placeholder="Description"
          name="desc"
          row="5"
          id="desc"
          required
          value={data.desc}
          onChange={change}
        />
        </div>

        <div className="mt-8 ml-8">
          <button className="bg-blue-700 px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-all duration-300"
          onClick={submit}>AddBook</button>
        </div>


        
      </form>
    </div>   
    </>
  )
}

export default Addbook;
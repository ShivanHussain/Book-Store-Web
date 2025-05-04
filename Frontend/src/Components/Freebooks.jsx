/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Bookscard from './Bookscard.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Loader from './Loader/Loader.jsx';

function Freebooks() {
  const [data, setData] = useState(null); // start with null for loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setData(null); // show loader
        setError(null);
        const res = await axios.get('http://localhost:1000/book/recent-book');
        setData(res.data.data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch books.');
      }
    };
    fetchBooks();
  }, []);

  // React Slick settings (responsive slider)
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280, // large laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-20 py-10">
      {/* Section Heading */}
      <h1 className="font-semibold text-3xl md:text-4xl text-slate-200 mb-6 ml-2 md:ml-4">
        Recently Added Books
      </h1>

      {/* Loader */}
      {!data && !error && (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}

      {/* Books Slider */}
      {data && (
        <Slider {...settings}>
          {data.map((item, i) => (
            <Bookscard Item={item} key={i} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Freebooks;

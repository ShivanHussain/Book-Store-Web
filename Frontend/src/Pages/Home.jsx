/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from '../Components/Banner';
import Freebooks from '../Components/Freebooks';

function Home() {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      {/* Banner Section */}
      <section className="w-full">
        <Banner />
      </section>

      {/* Freebooks Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Freebooks />
      </section>
    </div>
  );
}

export default Home;

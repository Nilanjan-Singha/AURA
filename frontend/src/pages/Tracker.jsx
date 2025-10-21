
import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import { useParams } from 'react-router-dom';

const Tracker = () => {
  const { type } = useParams(); 

  const upperType = type.charAt(0).toUpperCase() + type.slice(1);

const typeIcons = {
  movie: "/moviewhite.png",
  anime: "/animewhite.png",
  manga: "/mangawhite.png",
  books: "/bookswhite.png",
  games: "/game_.png",
};

const src = typeIcons[type] || "/aurawhite.png";

  const movieBanners = [
    "/hd1.jpg",
    "/hd2.jpg",
    "/hd3.jpg",
  ]

  const animeBanners = [
    "/anime4.jpg",
    "/anime6.jpg",
    "/anime8.jpg",
    "/anime9.jpg",
    "/anime10.jpg",
    "/anime11.jpg",
  ]

  const mangaBanners = [
    "/anime1.jpg",
    "/anime2.jpg",
    "/anime3.jpg",
    "/anime5.jpg",
    "/anime7.jpg",
  ]

  const gameBanners = [
    "/game1.jpg",
    "/game2.jpg",
    "/game3.jpg",
  ]

const banners = {
  movie: movieBanners,
  anime: animeBanners,
  manga: mangaBanners,
  games: gameBanners,
};

const getRandomBanner = (arr) => arr[Math.floor(Math.random() * arr.length)];

const bannerSrc = banners[type] ? getRandomBanner(banners[type]) : "/aura3.jpg";


  return (
    <div className='main '>
         <div className='main tracker-root'>
      <div className="header w-full flex flex-col gap-2 border-b  rounded-lg">
        {/* banner with logo on top  */}
        <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80  rounded-lg">
  {/* Banner background */}
  <img
    src={bannerSrc}
    alt="Banner"
    className="w-full h-full object-cover opacity-70 rounded-lg"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end items-start gap-4 px-2">
    <div className="logo  ">
      <img src={src} alt="Aura Logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain drop-shadow-lg" />
    </div>
        </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 mb-2 px-3 sm:px-6"> {upperType} Tracker</h1>
      </div>
      <div className="content flex flex-col sm:flex-row mt-4 ">
        <Sidebar type={type}/>
      <div className="content sm:flex-1 p-6">
        <Content type={type}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Tracker

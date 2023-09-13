// import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
// import { useNavigate } from 'react-router-dom';

const HomeBody = () => {
  // const navigate = useNavigate()
  return (
    <>
      <div className='bg-[url()] bg-cover text-white'>
        <div className='flex justify-center'>
          <img className='overflow-hidden w-full' src="https://e0.pxfuel.com/wallpapers/739/126/desktop-wallpaper-kettlebell-man-workout-data-src-workout-background.jpg" alt="" />
        </div>
        {/* <div className='grid sm:grid-cols-2 mt-5 sm:mt-9 md:mt-16 bg-white  overflow-hidden grid-cols-1'>
        <div className='flex justify-center  hover:cursor-pointer pt-5'>
          <img onClick={() => navigate('/clubs')} className='w-3/4  h-3/4' src='' alt="" />
        </div>
        <div className='flex justify-center'>
          <img className='w-3/4 h-full' src='' alt="" />
        </div>
      </div> */}
      </div>
    </>
  )
}
export default HomeBody;

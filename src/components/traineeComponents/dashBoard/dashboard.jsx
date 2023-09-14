// import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
// import { useNavigate } from 'react-router-dom';

const HomeBody = () => {
  // const navigate = useNavigate()
  return (
    <>

<div className="min-h-screen w-full">
        <main>
          <div className="max-w-full mx-auto px-2 mt-10 py-8 sm:px-6 lg:px-8">
            <div className="py-6 px-1 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl py-4 font-bold text-gray-900">My Tasks</h2>
                <ul className="space-y-4">
                 
                      <li
                        className="border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
                      >
                        <div className="flex-grow">
                          <p className="text-lg font-semibold">
                          </p>
                          <p className="text-gray-900">Task: </p>
                          <p className="text-gray-900 mt-2">
                            Status: 
                              'Task Completed'
                            
                          </p>
                        </div>
                            <span className="text-green-600">Task Completed</span>
                              
                      </li>

                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}
export default HomeBody;

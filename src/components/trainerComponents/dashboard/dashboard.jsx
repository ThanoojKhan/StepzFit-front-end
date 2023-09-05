import React from 'react';
import { Toaster } from 'react-hot-toast';

function Dashboard() {
  return (
    <div className="min-h-screen w-full ">
      <Toaster toastOptions={3000} />
      <header className="bg-white ps-5 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900">Data</h2>
              <div className="mt-4 flex justify-center">
                <div className='md:w-11/12 w-full'>
                  <canvas className='w-3/4' ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
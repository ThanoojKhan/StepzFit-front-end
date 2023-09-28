import { PowerIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem, } from "@material-tailwind/react";
import React, { useState } from 'react';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { trainerLogout } from '../../store/slice/trainer';
import navbarIcon from '../../assets/images/logo/StepzFit-Logowhite-nobg.png'
function SideBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)

  const closeSidebar = () => {
    setShow(true);
  };
  return (

    <>
      <div className="flex">
        {show ? (
          <div className="fixed text-white z-50 lg:hidden ms-5 mt-7 w3-animate-left drop-shadow-lg cursor-pointer" onClick={() => setShow(false)} size={20}>Menu</div>
        ) : (
          ''
        )}
        <div className={`${show ? '' : 'fixed w-screen h-screen '} flex flex-wrap z-50 lg:w-96 lg:-mr-24 xl:-mr-24 h-screen`} onClick={closeSidebar}>
          <Card
            style={{ position: 'fixed' }}
            className={`rounded-none lg:flex z-50 ${show ? 'hidden' : 'flex w3-animate-left w-screen bg-opacity-75 bg-black backdrop-blur-[2px]'
              }  overflow-y-auto lg:bg-black h-screen w-full max-w-[18rem] p-4 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={`/home`} className='flex justify-center' >
              <div className="animate-pulse w-36 my-10 ">
                <img src={navbarIcon} alt="" />
              </div>
            </Link>
            <div className='hover:scale-105 transition-transform cursor-pointer' onClick={() => setShow(true)} size={20}>
              {show ? "" : <TfiAngleDoubleLeft className="ms-5  text-white mt-10 lg:hidden " />}
            </div>

            <List className='text-white my-10'>
              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform `} onClick={() => navigate('/trainer/dashboard')}>
                Dashboard
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform `} onClick={() => navigate('/trainer/messages')}>
                Messages
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform `} onClick={() => navigate('/trainer/taskScheduler')}>
                Task Scheduler
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform `} onClick={() => navigate('/trainer/traineesData')}>
                Trainees Data
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform `} onClick={() => navigate('/trainer/myProfile')}>
                My Profile
              </ListItem>
            </List>
            <div className="relative mt-auto text-white mb-24" >
              <div className="rounded-md">
                <ListItem onClick={() => {
                  dispatch(trainerLogout())
                  navigate('/trainer/login')
                }} className="hover:scale-105  hover:bg-zinc-800 transition-transform">
                  <PowerIcon className="h-5 w-5 me-2 " />
                  Logout
                </ListItem>
              </div>
            </div>
            <div className="flex justify-center text-zinc-400 text-xs items-center cursor-default">Copyright @ StepzFit Wellness</div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default SideBar
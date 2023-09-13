import React, { useState, useEffect, useRef } from 'react';
import {
  Card, List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  PowerIcon, CogIcon
} from "@heroicons/react/24/solid";
import { userLogout } from '../../store/slice/user';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';
import { FaBars } from 'react-icons/fa';


function SideBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation()

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/home');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className='lg:w-1/3 z-50 '>
        {show ? (
          <FaBars className="absolute lg:hidden ms-5 mt-8 w3-animate-left h-8 w-6 drop-shadow-lg cursor-pointer" onClick={() => setShow(false)} size={20} />
        ) : ''}
        <div className={`${show ? '' : 'fixed w-screen h-screen '} lg:staic lg:w-0 lg:h-0`}>
          <Card
            style={{ position: 'fixed' }}
            className={`lg:flex z-50 ${show ? 'hidden' : 'flex w3-animate-left w-screen bg-opacity-75 bg-black backdrop-blur-[2px]'} lg:bg-black h-screen w-full max-w-[18rem] p-4 shadow-2xl`}
          >
            <Link to={`/home`} className='flex justify-center' >
              <div className="animate-pulse w-36 my-10 ">
                <img src="\src\assets\images\logo\StepzFit-Logowhite-nobg-png.png" alt="" />
              </div>
            </Link>
            <div className='hover:scale-105 transition-transform cursor-pointer' onClick={() => setShow(true)} size={20}>
              {show ? "" : <TfiAngleDoubleLeft className="ms-5  text-white mt-10 lg:hidden " />}
            </div>

            <List className='text-white my-10'>
              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform ${location.pathname == '/dashboard' ? 'scale-110 ml-2 bg-zinc-800 font-semibold w3-animate-left hover:scale-110' : ''}`} onClick={() => navigate('/dashboard')}>
                Dashboard
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform ${location.pathname == '/messages' ? 'scale-110 ml-2 bg-zinc-800 font-semibold w3-animate-left hover:scale-110' : ''}`} onClick={() => navigate('/messages')}>
                Messages
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform ${location.pathname == '/foodTracker' ? 'scale-110 ml-2 bg-zinc-800 font-semibold w3-animate-left hover:scale-110' : ''}`} onClick={() => navigate('/foodTracker')}>
                Food Tracker
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform ${location.pathname == '/myTasks' ? 'scale-110 ml-2 bg-zinc-800 font-semibold w3-animate-left hover:scale-110' : ''}`} onClick={() => navigate('/myTasks')}>
                My Tasks
              </ListItem>

              <ListItem className={`hover:scale-105 hover:bg-zinc-800 transition-transform ${location.pathname == '/bodyMetrics' ? 'scale-110 ml-2 bg-zinc-800 font-semibold w3-animate-left hover:scale-110' : ''}`} onClick={() => navigate('/bodyMetrics')}>
                Body Metrics
              </ListItem>
            </List>
            <div className="relative mt-auto text-white mb-20" ref={dropdownRef}>
              <div className="rounded-md " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <ListItem className="hover:scale-105  hover:bg-zinc-800 transition-transform">
                  <ListItemPrefix>
                    <CogIcon className="h-5 w-5 me-2" />
                  </ListItemPrefix>
                  Settings
                </ListItem>
              </div>
              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 mt-2 w-full bg-zinc-800 text-white rounded-md shadow-lg mb-2 ">
                  <ListItem className="hover:scale-105  hover:bg-slate-900 transition-transform px-4" onClick={() => navigate('/myProfile')}>
                    My Profile
                  </ListItem>
                  <ListItem className="hover:scale-105  hover:bg-slate-900 transition-transform px-4" onClick={() => navigate('/myPlan')}>
                    My Plan
                  </ListItem>
                  <ListItem className="hover:scale-105  hover:bg-slate-900 transition-transform px-4" onClick={handleLogout}>
                    <ListItemPrefix>
                      <PowerIcon className="h-5 w-5 me-2" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>

  )
}

export default SideBar
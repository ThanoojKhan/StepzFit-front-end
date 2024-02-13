import {
  CogIcon,
  PowerIcon
} from "@heroicons/react/24/solid";
import {
  Card, List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from 'react';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/slice/user';
import navbarIcon from "../../assets/images/logo/StepzFit-Logowhite-nobg.png"

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/home');
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
            <div className="relative mt-auto text-white mb-24" ref={dropdownRef}>
              <div className="rounded-md " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <ListItem className="hover:scale-105  hover:bg-zinc-800 transition-transform">
                  <ListItemPrefix>
                    <CogIcon className="w-8 me-2" />
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
                  {/* <ListItem className="hover:scale-105  hover:bg-slate-900 transition-transform px-4" onClick={() => navigate('/myPlan')}>
                    My Trainer
                  </ListItem> */}
                  <ListItem className="hover:scale-105  hover:bg-slate-900 transition-transform px-4" onClick={handleLogout}>
                    <ListItemPrefix>
                      <PowerIcon className="h-6 w-6 me-2" />
                    </ListItemPrefix>
                    Log Out
                  </ListItem>
                </div>
              )}
            </div>
            <div className="flex justify-center text-zinc-400 text-xs items-center cursor-default">Copyright @ StepzFit Wellness</div>
          </Card>
        </div>
      </div>
    </>

  )
}

export default SideBar
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
                <img src="\src\assets\images\logo\StepzFit-Logowhite-nobg-png.png" alt="" />
              </div>
            </Link>
            <div className='hover:scale-105 transition-transform cursor-pointer' onClick={() => setShow(true)} size={20}>
              {show ? "" : <TfiAngleDoubleLeft className="ms-5  text-white mt-10 lg:hidden " />}
            </div>

            <List className='text-white my-10'>
              <ListItem className={`hover:scale-105 transition-transform`} onClick={() => navigate('/admin')} >
                Dashboard
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/admin/messages')}>
                Messages
              </ListItem>
              
              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/admin/users')}>
                Trainees
              </ListItem>


              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                navigate('/admin/trainers')
              }} >
                Trainers
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                navigate('/admin/plans')
              }} >
                Plans
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => {
                dispatch(adminLogout())
                navigate('/admin/login')
              }} >
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5 me-2 " />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List> 
          
          </Card>
        </div>
      </div>
    </>
  )
}

export default SideBar
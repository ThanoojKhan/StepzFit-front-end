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
import { useNavigate } from 'react-router-dom';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';
import { FaBars } from 'react-icons/fa';


function SideBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <div className='lg:w-1/3 z-50'>
        {show ? (
          <FaBars className="absolute lg:hidden ms-1 mt-5" onClick={() => setShow(false)} size={20} />
        ) : ''}
        <div className={`${show ? '' : 'fixed w-screen h-screen '} lg:staic lg:w-0 lg:h-0`}>
          <Card
            style={{ position: 'fixed' }}
            className={`lg:flex z-auto ${show ? 'hidden' : 'flex w-screen bg-opacity-70 backdrop-blur-[2px]'}  top-4 left-4 h-screen ease-in-out duration-500 w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5`}
          >
            <div className=''>{show ? "" : <TfiAngleDoubleLeft className="ms-5 lg:hidden mt-5" onClick={() => setShow(true)} size={20} />}</div>

            <List>
              <ListItem className={`hover:scale-105 transition-transform`} onClick={() => navigate('/')}>
                Dashboard
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/messages')}>
                Messages
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/foodTracker')}>
                Food Tracker
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/myTasks')}>
                My Tasks
              </ListItem>

              <ListItem className='hover:scale-105 transition-transform' onClick={() => navigate('/bodyMetrics')}>
                Body Metrics
              </ListItem>

              <div className="relative mt-auto" ref={dropdownRef}>
                <div
                  className="rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <ListItem className="hover:bg-gray-100">
                    <ListItemPrefix>
                      <CogIcon className="h-5 w-5 me-2" />
                    </ListItemPrefix>
                    Settings
                  </ListItem>
                </div>

                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200">
                    <ListItem className="hover:bg-gray-100 px-4 py-2" onClick={() => navigate('/myProfile')}>
                      My Profile
                    </ListItem>
                    <ListItem className="hover:bg-gray-100 px-4 py-2" onClick={handleLogout}>
                      <ListItemPrefix>
                        <PowerIcon className="h-5 w-5 me-2" />
                      </ListItemPrefix>
                      Log Out
                    </ListItem>
                  </div>
                )}
              </div>
            </List>
          </Card>
        </div>
      </div>
    </>

  )
}

export default SideBar
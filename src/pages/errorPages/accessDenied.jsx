import React from 'react'
import './accessDenied.css'
import { useNavigate } from 'react-router-dom';


function AccessDenied() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className="w3-display-middle">
      <h1 className="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
      <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }}/>
      <h3 className="w3-center w3-animate-right mt-3">You dont have the permission to view this page.</h3>
      <h3 className="w3-center w3-animate-zoom mt-3">🚫🚫🚫🚫</h3>
      <h6 className="w3-center w3-animate-zoom mt-5">error code:403 forbidden</h6>
      <span className='flex items-center w3-animate-bottom justify-center mt-10 cursor-pointer' onClick={goBack} >Go back</span>
    </div>
  )
}

export default AccessDenied
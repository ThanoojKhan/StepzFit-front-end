import React from 'react'
import { useNavigate } from 'react-router-dom'
import './serverError.css'
function ServerError() {
  const navigate = useNavigate()
  return (
    <><div id="notfound">
		<div class="notfound cursor-default">
			<div class="notfound-404">
				<h1>Oops!</h1>
				<h2>500 - Server Error</h2>
			</div>
			<p className='cursor-pointer' onClick={()=>navigate('/home')}>Go To Homepage</p>
		</div>
	</div></>
  )
}

export default ServerError
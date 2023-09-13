import React from 'react'
import { useNavigate } from 'react-router-dom'
import './serverError.css'
function ServerError() {
  const navigate = useNavigate()
  return (
    <><div id="notfound">
		<div className="notfound cursor-default">
			<div className="notfound-404">
				<h1 className='!important animate-pulse' >Oops!</h1>
				<h2 className='!important w3-animate-bottom'>500 - Server Error</h2>
			</div>
		</div>
	</div></>
  )
}

export default ServerError
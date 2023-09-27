import React from 'react'
import { useNavigate } from 'react-router-dom'
import './serverError.css'
function ServerError() {
	const navigate = useNavigate()
	const goBack = () => {
		navigate(-1);
	};
	return (
		<>
			<div id="notfound">
				<div onClick={goBack} className="notfound cursor-pointer">
					<div className="notfound-404">
						<h1 className='!important animate-pulse' >Oops!</h1>
						<h2 className='!important w3-animate-bottom'>500 - Server Error</h2>
					</div>
					<span className='flex items-center w3-animate-bottom justify-center mt-10 cursor-pointer' onClick={goBack} >Go back</span>
				</div>
			</div>
		</>
	)
}

export default ServerError
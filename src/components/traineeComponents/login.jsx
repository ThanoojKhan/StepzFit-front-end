import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { userLogin } from '../../store/slice/user'
import GoogleLoginComponent from './googleLogin'
import NavbarIcon from '../../assets/images/logo/StepzFit-Logowhite-nobg.png'
import FooterLogo from '../landingPageComponents/organs/FooterLogo'
import StickyIcons from '../landingPageComponents/molecules/StickyIcons'
import BgLogin from '../../assets/images/images/login-bg.jpg'
import Loading from '../loading'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reMail, setRemail] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [forgott, setForgott] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleLogin() {
    setIsAdding(true)
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('Fill all the fields')
      setIsAdding(false)
    } else {
      axiosInstance.post('/user/login', { email, password, reMail }).then((res) => {
        if (res.data) {
          toast.success(res.data.message)
          const name = res.data.name
          const token = res.data.token
          const role = res.data.role
          const userId = res.data.userId
          dispatch(userLogin({ name, token, role, userId }))
          navigate('/')
          setIsAdding(false)
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          setRemail(true)
          toast.error(error.response.data.errMsg)
          setIsAdding(false)
        } else if (error.response.data.errMsg) {
          toast.error(error.response.data.errMsg)
          setIsAdding(false)
        }
      })
    }
  }

  const forgotPassword = () => {
    setIsAdding(true)
    axiosInstance.post('/user/forgottPassword', { email }).then((res) => {
      toast.success(res.data.message)
      setIsAdding(false)
    }).catch((error) => {
      if (error.response.data.errMsg) {
        toast.error(error.response.data.errMsg)
        setIsAdding(false)
      }
    })
  }

  const backgroundStyle = {
    backgroundImage: `url(${BgLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '900px',
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      {forgott ?
        <section className="w-full h-screen relative overflow-x-hidden">
          <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle} >
            <div className="w-full h-full absolute bg-black backdrop-blur-sm bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
              <div className="items-start justify-center">
                <Link to={`/home`} className={`font-extrabold flex justify-center relative text-lg w3-animate-zoom delay-100`}>
                  <div className="animate-pulse md:w-1/4 w-2/5">
                    <img src={NavbarIcon} alt="" />
                  </div>
                </Link>
                <h1 className="lg:text-4xl md:text-2xl text-3xl text-center mt-16 my-5 text-white font-extralight w3-animate-opacity w3-animate-zoom">Password Reset</h1>
              </div>
              <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder={email} className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
              <button onClick={isAdding ? null : forgotPassword} type="button" className={`${isAdding ? 'opacity-50 cursor-not-allowed' : ''} w3-animate-bottom mt-10 text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30`}>
                {isAdding ? <Loading /> : 'Reset Password'}
              </button>
              <h4 onClick={() => setForgott(false)} className="lg:text-lg text-sm text-center cursor-pointer mt-10 text-white font-extralight px-20 w-auto w3-animate-bottom">Back to Login</h4>
              <div className='bottom-0 fixed'>
                <FooterLogo /></div>
            </div>
          </main>
          <StickyIcons />
        </section>
        :
        <>
          <section className="w-full h-screen relative overflow-x-hidden">
            <main className={`${isAdding ? 'cursor-progress' : ''} w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden`} style={backgroundStyle}>
              <div className="w-full h-full absolute bg-black backdrop-blur-sm bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
                <div className="items-start justify-center">
                  <Link to={`/home`} className={`font-extrabold flex justify-center relative text-lg w3-animate-zoom delay-100`}>
                    <div className="animate-pulse lg:w-1/4 w-2/5">
                      <img src={NavbarIcon} alt="" />
                    </div>
                  </Link>
                </div>
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder={email || "Email"} className="w3-animate-zoom mt-32 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
                {reMail == true ? '' :
                  <>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="w3-animate-zoom mt-4 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
                  </>
                }
                <button onClick={isAdding ? null : handleLogin} type="button" className={`w3-animate-zoom mt-6 text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30`}>
                  {isAdding ? <Loading /> : 'Login'}
                </button>
                <h3 onClick={() => setForgott(true)} className="lg:text-lg text-sm text-center cursor-pointer text-white font-extralight my-5 px-20 w-auto w3-animate-zoom">Forgot Password?</h3>
                <h3 onClick={() => navigate('/otpLogin')} className="lg:text-lg text-sm text-center hover:bg-black hover:border-transparent cursor-pointer text-white font-extralight my-5 px-20 w-auto border rounded-xl w3-animate-bottom"><p className='py-2'> OTP Login</p></h3>
                <div className="flex items-center my-6">
                  <p className="text-lg text-white cursor-default">or</p>
                </div>
                {reMail == true ? '' :
                  <div className='w3-animate-bottom items-center flex flex-col'>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
                      <GoogleLoginComponent />
                    </GoogleOAuthProvider>
                    <div className="flex items-center my-6">
                      <h4 onClick={() => navigate('/register')} className="text-lg text-white text-center font-extralight cursor-pointer hover:underline underline-offset-2 w3-animate-bottom">Not a Memeber Yet?</h4>
                    </div>
                  </div>
                }
                <div className='bottom-0 fixed'>
                  <FooterLogo />
                </div>
              </div>
            </main>
            <StickyIcons />
          </section>
        </>
      }

    </>
  )
}

export default Login
import React, { useEffect, useRef, useState } from 'react'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import { BsFillShieldLockFill } from 'react-icons/bs'
import axiosInstance from '../../api/axios'
import { Toaster, toast } from 'react-hot-toast'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../api/firebase';
import { useDispatch } from 'react-redux'
import { userLogin } from '../../store/slice/user'
import { Link, useNavigate } from 'react-router-dom'
import NavbarIcon from '../../assets/images/logo/StepzFit-Logowhite-nobg.png'
import FooterLogo from '../landingPageComponents/organs/FooterLogo'
import BgLogin from '../../assets/images/images/login-bg.jpg'
import StickyIcons from '../landingPageComponents/molecules/StickyIcons'

function OtpPage() {

  const regex_mobile = /^\d{10}$/
  const [clicked, setClicked] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState()
  const [resend, setResend] = useState(false)
  const [data, setData] = useState('')
  const [seconds, setSeconds] = useState(60);
  const countdownIntervalRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const checkMob = () => {
    setResend(false);
    setClicked(true)
    if (!regex_mobile.test(phone)) {
      toast.error('Enter a valid mobile number');
      setClicked(false)
    } else {
      axiosInstance.post('/user/otpLogin', { phone })
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.data);
            onCaptchaVerify();
            const appVerifier = window.recaptchaVerifier;
            const phoneNo = '+91' + phone;

            signInWithPhoneNumber(auth, phoneNo, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShowOTP(true);
                toast.success('OTP sent');
                setClicked(false)
              })
              .catch((error) => {
                console.error("Error while sending OTP:", error);
                setClicked(false)
                if (error.response && error.response.data && error.response.data.errMsg) {
                  toast.error(error.response.data.errMsg);
                  setClicked(false)
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error in checkMob:", error);
          setClicked(false)
          if (error.response && error.response.data && error.response.data.errMsg) {
            toast.error(error.response.data.errMsg);
            setClicked(false)
          } else {
            toast.error('An error occurred while checking the mobile number');
            setClicked(false)
          }
        });
    }
  };


  function onCaptchaVerify() {
    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (!recaptchaContainer) {
      console.error('reCAPTCHA container element not found.');
      return;
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          checkMob();
        },
        'expired-callback': () => {
          console.log('expired callback');
        }
      }, auth);
    }
  }

  function otpVerify() {
    setClicked(true)
    window.confirmationResult.confirm(otp).then(async (res) => {
      dispatch(userLogin({ name: data.name, token: data.token, role: data.role, userId: data.userId }))
      navigate('/')
    }).catch((err) => {
      setResend(true)
      setClicked(false)
      toast.error('Otp verify error')
      console.log(err + 'otp verify error');
    })
  }

  useEffect(() => {
    if (showOTP) {
      setSeconds(60)
      if (seconds > 0) {
        const decrementSeconds = () => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
        countdownIntervalRef.current = setInterval(decrementSeconds, 1000);
      }
      return () => clearInterval(countdownIntervalRef.current);
    }
  }, [resend, showOTP]);

  useEffect(() => {
    if (seconds <= 0) {
      setResend(true)
      clearInterval(countdownIntervalRef.current)
    }
  }, [seconds]);

  const backgroundStyle = {
    backgroundImage: `url(${BgLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '900px',
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div style={{ 'height': '100vh' }} className='bg-black flex justify-center items-center'>
        <div id='recaptcha-container'></div>
        <section className="w-full h-screen relative overflow-x-hidden">
          <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle} >
            <div className="w-full h-full absolute bg-black backdrop-blur-sm bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
              <div className="items-start justify-center">
                <Link to={`/home`} className={`font-extrabold flex justify-center relative text-lg w3-animate-zoom delay-100`}>
                  <div className="animate-pulse md:w-1/4 w-2/5">
                    <img src={NavbarIcon} alt="" />
                  </div>
                </Link>
                <h1 className="lg:text-4xl md:text-2xl text-3xl text-center mt-16 my-5 text-white font-extralight w3-animate-opacity w3-animate-zoom">OTP Login</h1>
                <h1 className="text-md text-center mt-16 text-white font-extralight w3-animate-opacity w3-animate-zoom">
                  {showOTP ? <BsFillShieldLockFill size={30} /> : 'Enter OTP'}
                </h1>
              </div>
              {showOTP ?
                <>
                  <OtpInput
                    className='mt-5'
                    OTPLength={6}
                    value={otp}
                    onChange={setOtp}
                    otpType='number'
                    disabled={false}
                    autoFocus
                  />
                  <span className='text-center mt-5 text-white'>{seconds}</span>
                </>
                :
                <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder='Mobile No' className="w3-animate-zoom mt-5 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
              }
              {!showOTP ?
                <button className='opacity-50 w3-animate-bottom mt-10 text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center' onClick={checkMob}>
                  {clicked ?
                    <CgSpinner size={20} className='animate-spin' />
                    : ''}
                  <span>Send OTP</span>
                </button>
                :
                resend ? <button className='opacity-50 w3-animate-bottom mt-10 text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center' onClick={checkMob}>
                  {clicked ?
                    <CgSpinner size={20} className='animate-spin' />
                    : ''}
                  <span>Resend OTP</span></button>
                  :
                  <button className='opacity-50 w3-animate-bottom mt-10 text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center' onClick={otpVerify}>
                    {clicked ?
                      <CgSpinner size={20} className='animate-spin' />
                      : ''}
                    <span>Verify OTP</span>
                  </button>
              }
              <h4 onClick={() => navigate('/')} className="lg:text-lg text-sm text-center cursor-pointer mt-10 text-white font-extralight px-20 w-auto w3-animate-bottom">Back to Login</h4>
              <div className='bottom-0 fixed'>
                <FooterLogo /></div>
            </div>
          </main>
          <StickyIcons />
        </section>
      </div>
    </>
  )
}

export default OtpPage
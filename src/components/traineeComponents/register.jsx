import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import NavbarIcon from '../../assets/images/logo/StepzFit-Logowhite-nobg.png'
import FooterLogo from '../landingPageComponents/organs/FooterLogo'
import StickyIcons from '../landingPageComponents/molecules/StickyIcons'
import BgLogin from '../../assets/images/images/login-bg.jpg'
import Loading from '../loading'

function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [rePassword, setRePassword] = useState('')
  const [Err, setErr] = useState(null)
  const navigate = useNavigate()

  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/gm
  const regex_mobile = /^\d{10}$/

  async function handleSubmit() {
    try {
      axiosInstance.post('/user/register', { name, email, phone, password }).then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate('/login');
            setIsAdding(false);
          }, 3000); 
        }
      }).catch((err) => {
        if (err) {
          toast.error(err.response.data.errMsg)
          setIsAdding(false)
        }
      })
    } catch (error) {
      console.log(error);
      setIsAdding(false)
    }
  }

  const onSignUP = () => {
    setIsAdding(true)
    if (name.trim().length == 0 || email.trim().length == 0 || phone.trim().length == 0 || password.trim().length == 0 || rePassword.trim().length == 0) {
      setErr('Fill all the fields')
      setIsAdding(false)
    } else {
      if ((regex_mobile.test(phone) == false)) {
        setErr('Enter valid Mobile Number')
        setIsAdding(false)
      } else if (regex_password.test(password) == false) {
        setErr('Password should contain A-Z & a-z & 1-9')
        setIsAdding(false)
      } else if (password !== rePassword) {
        setErr("Password doesn't match")
        setIsAdding(false)
      } else {
        handleSubmit()
      }
    }
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
      <section className="w-screen h-screen flex flex-col justify-center items-center relative overflow-x-hidden overflow-y-auto">
        <main className="w-full lg:h-screen h-screen relative bg-zinc-900 overflow-x-hidden " style={backgroundStyle}>
          <div className="w-full h-full absolute bg-black backdrop-blur-sm bg-opacity-75 flex flex-col items-center justify-center px-4 overflow-x-hidden">
            <div className="items-start justify-center">
              <Link to={`/home`} className={`font-extrabold flex justify-center relative text-lg w3-animate-zoom delay-100`}>
                <div className="animate-pulse md:w-1/4 w-2/5">
                  <img src={NavbarIcon} alt="" />
                </div>
              </Link>
              <h1 className="lg:text-4xl md:text-2xl text-3xl text-center mt-16 my-5 text-white font-extralight w3-animate-opacity w3-animate-zoom">Become A StepzFit Member</h1>
            </div>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
            <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Mobile" className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
            <input type="password" onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" className="w3-animate-zoom mt-10 input bg-transparent border text-center text-white border-x-gray-500 w-full max-w-md" />
            <div className='flex my-4 justify-center'>
              <span className='text-red-600 text-sm'>{Err}</span>
            </div>
            <button onClick={isAdding ? null : onSignUP} type="button" className={`${isAdding ? 'opacity-50 cursor-not-allowed' : ''} w3-animate-bottom text-lg text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-normal rounded-lg text- px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30`}>
              {isAdding ? <Loading /> : 'Register'}
            </button>
            <h4 onClick={() => navigate('/login')} className="mb-10 lg:text-lg text-sm text-center cursor-pointer mt-10 text-white font-extralight px-20 w-auto w3-animate-bottom">Back to Login</h4>
            <div className='bottom-0 fixed flex justify-center items-center w-screen h-20'>
              <FooterLogo />
            </div>
          </div>
        </main>
        <StickyIcons />
      </section>
    </>
  )
}

export default SignUp
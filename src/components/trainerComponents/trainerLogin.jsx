import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useDispatch } from 'react-redux';
import { trainerLogin } from '../../store/slice/trainer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reMail, setRemail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('Fill all the fields')
    } else {console.log('sdfgae');
      axiosInstance.post('/trainer/login', { email, password }).then((res) => {
        if (res.data) {
          console.log('dg');
          toast.success(res.data.message)
          const name = res.data.name
          const token = res.data.token
          const role = res.data.role
          const trainerId = res.data.trainerId
          dispatch(trainerLogin({ name, token, role, trainerId }))
          navigate('/')
        }
      }).catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setRemail(true)
          toast.error(error.response.data.errMsg)
        } else if (error.response.data.errMsg) {
          toast.error(error.response.data.errMsg)
        }
      })
    }
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Trainer Sign in</h1>

            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder={email || 'Email'}
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
            />
            <div className="">
              <button
                onClick={handleLogin}
                className={`w-full text-center py-3 rounded ${reMail ? 'bg-amber-700' : 'bg-green-800'
                  } text-white hover:bg-green-dark focus:outline-none my-1`}
              >
                Login Account
              </button>
              <button
                onClick={() => navigate('/otpLogin')}
                className={`w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1`}
              >
                OTP Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

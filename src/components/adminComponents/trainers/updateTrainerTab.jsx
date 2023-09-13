import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from "../../../api/axios"
import errorFunction from '../../../services/errorHandling'


function UpdateTrainer(props) {

  const trainerId = props.trainerId
  const { token } = useSelector((state) => state.Admin)
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [department, setDept] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [certification, setCertification] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [addedDate, setAddedDate] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const [Err, setErr] = useState(null)
  const navigate = useNavigate()
  const [change, setChange] = useState(false)


  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/gm
  const regex_mobile = /^\d{10}$/

  useEffect(() => {
    axiosInstance
      .get(`/admin/trainerDetails/${trainerId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFirstName(res?.data?.details?.firstName)
        setSecondName(res?.data?.details?.secondName)
        setEmail(res?.data?.details?.email)
        setDob(res?.data?.details?.d_o_b)
        setGender(res?.data?.details?.gender)
        setPhone(res?.data?.details?.phone)
        setCertification(res?.data?.details?.certification)
        setDept(res?.data?.details?.department)
        setUserName(res?.data?.details?.userName)
        setPassword(res?.data?.details?.password)
        setProfileImage(res?.data?.details?.profileImage)
        setCoverImage(res?.data?.details?.coverImage)
        setAddedDate(res?.data?.details?.addedDate)
      })
      .catch((error) => {
        errorFunction(error, navigate)
      });
  }, [change]);



  const handleSubmit = () => {
    console.log("dfgh");
    try {
      axiosInstance.patch(`/admin/updateTrainer/${trainerId}`, { firstName, secondName, email, dob, gender, phone, department, certification, userName, password, addedDate }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.message) {
          toast.success(res.data.message)
          navigate('/admin/trainers')
        }
      }).catch((err) => {
        errorFunction(err, navigate)
      })
    } catch (error) {
      console.log(error);
    }
  }

  function onUpdateTrainer() {
    if ((regex_mobile.test(phone) == false)) {
      setErr('Enter valid mobile number')
    } else if (regex_password.test(password) == false) {
      setErr('Use a stronger password')
    } else if (regex_password.test(userName) == false) {
      setErr('Use a stronger username')
    } else {
      handleSubmit()
    }
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-full max-w-md mx-auto px-6 py-8 rounded shadow-md text-black">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => {
              window.history.back();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h1 className="mb-8 text-3xl text-center">Update Trainer</h1>
          <div className="grid grid-cols-2 gap-4">
            {/* Input fields here */}

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstName"
                value={firstName}
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Second Name
              </label>
              <input
                type="text"
                onChange={(e) => setSecondName(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="secondName"
                value={secondName}
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Email
              </label>

              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                value={email}
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Date Of Birth
              </label>

              <input
                type="text"
                onChange={(e) => setDob(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="dob"
                value={dob}
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="gender"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Department
              </label>

              <select
                value={department}
                onChange={(e) => setDept(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="department"
              >
                <option value="" disabled>Select Department</option>
                <option value="Fitness">Fitness</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Trainer(virtual)">Trainer(virtual)</option>
              </select>
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Certification
              </label>

              <input
                type="text"
                onChange={(e) => setCertification(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="certification"
                value={certification}
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Mobile No
              </label>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phone"
                value={phone}
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Username
              </label>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className={`block border ${Err === 'Use a stronger username' ? 'border-red-700' : ''
                  } border-grey-light w-full p-3 rounded mb-4`}
                name="password"
                value={userName}
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">
                Password
              </label>

              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className={`block border ${Err === 'Use a stronger password' ? 'border-red-700' : ''
                  } border-grey-light w-full p-3 rounded mb-4`}
                name="password"
                value={password}
              />
            </div>

          </div>

          <div className="col-span-2 flex justify-center">
            <span className="text-red-600 text-sm">
              {Err ? Err : 'Password should contain A-Z&a-z&1-9'}
            </span>
          </div>
          <button
            type="submit"
            onClick={() => onUpdateTrainer()}
            className="w-full text-center py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Update Trainer
          </button>
          <button
            className="w-full text-center py-3 rounded text-red-700 hover:bg-green-dark focus:outline-none my-1"
            type="button"
            onClick={() => {
              // Navigate back to the previous page
              window.history.back();
            }}
          >
            Close
          </button>
        </div>
      </div>

    </>
  )
}

export default UpdateTrainer
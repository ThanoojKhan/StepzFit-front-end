import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axios'
import errorFunction from '../../../services/errorHandling'


function AddTrainer() {

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDept] = useState('')
  const [certification, setCertification] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [addedDate, setAddedDate] = useState('')

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    setAddedDate(formattedDate);
  }, []);

  const [Err, setErr] = useState(null)
  const navigate = useNavigate()

  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/gm
  const regex_mobile = /^\d{10}$/

  const handleSubmit = () => {
    try {
      axiosInstance.post('/admin/addTrainer', { firstName, secondName, email, dob, gender, phone, department, certification, userName, password, addedDate }).then((res) => {
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

  function onAddTrainer() {
    if (firstName.trim().length == 0 || secondName.trim().length == 0 || email.trim().length == 0 || phone.trim().length == 0 || password.trim().length == 0) {
      setErr('Fill all the fields')
    } else {
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
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className=" w-screen h-screen md:pt-0 flex  justify-center items-center">
        <div className=" h-screen mt-20 w-3/4 mx-auto px-6 py-8 rounded shadow-md text-black">
          <h1 className="mb-8 text-3xl text-zinc-300 text-center">Add Trainer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="firstName"
              placeholder="First Name"
            />
            <input
              type="text"
              onChange={(e) => setSecondName(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="secondName"
              placeholder="Second Name"
            />
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="email"
              placeholder="Email"
            />
            <input
              type="text"
              onChange={(e) => setDob(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="dob"
              placeholder="Date Of Birth"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="gender"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <select
              value={department}
              onChange={(e) => setDept(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="department"
            >
              <option value="" disabled>Select Department</option>
              <option value="Fitness">Fitness</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Trainer(virtual)">Trainer(virtual)</option>
            </select>
            <input
              type="text"
              onChange={(e) => setCertification(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="certification"
              placeholder="Certification"
            />
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              className="block border border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4"
              name="phone"
              placeholder="Phone No"
            />
            <input
              type="password"
              onChange={(e) => setUserName(e.target.value)}
              className={`block border ${Err === 'Use a stronger username' ? 'border-red-700' : ''
                } border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4`}
              name="password"
              placeholder="Username"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`block border ${Err === 'Use a stronger password' ? 'border-red-700' : ''
                } border-gray-300 bg-gray-100 w-full p-4 rounded-lg mb-4`}
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <span className="text-red-600 text-sm">
              {Err ? Err : 'Password should contain A-Z&a-z&1-9'}
            </span>
          </div>
          <button
            type="submit"
            onClick={() => onAddTrainer()}
            className="w-full text-center py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Add Trainer
          </button>
          <button
            className="w-full text-center py-3 rounded text-red-700 hover:bg-green-dark focus:outline-none my-1"
            type="button"
            onClick={() => {
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

export default AddTrainer
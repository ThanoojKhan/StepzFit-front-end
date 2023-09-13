import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../api/axios'
import { toast, Toaster } from 'react-hot-toast'
import { CgSpinner } from 'react-icons/cg'
import Loader from './loader'
import errorFunction from '../../../services/errorHandling'
import { useNavigate } from 'react-router-dom'



function TrainerDetailTab(props) {

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
  const navigate = useNavigate()




  const [change, setChange] = useState(false)
  const [edit, setEdit] = useState(false)
  const [submitLoad, setSubmitLoad] = useState(false)
  const [newMob, setNewMob] = useState(null)
  const [loader, setLoader] = useState(true)
  const [err, setErr] = useState('')
  const regex_mobile = /^\d{10}$/




  useEffect(() => {
    axiosInstance.get(`/admin/trainerDetails/${trainerId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoader(false)
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
        setPassword(res?.data?.details?.isBlocked)

      })
      .catch((error) => {
        errorFunction(error, navigate)
      });
  }, [change]);



  return (
    <>
      <div className="capitalize">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="w-full max-w-3xl mx-auto overflow-y-auto bg-transparent rounded-lg">
            <div className="p-5 bg-black text-white rounded-t flex justify-center">
              <h3 className="text-3xl font-semibold">Trainer Details</h3>
            </div>
            <div className="p-6 bg-black text-white rounded-b-lg">
              <div className="flex justify-center mb-8">
                <img
                  src={profileImage ? profileImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="...."
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">First Name</label>
                  <p className="text-gray-300">{firstName}</p>
                </div>
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">Last Name</label>
                  <p className="text-gray-300">{secondName}</p>
                </div>
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">Gender</label>
                  <p className="text-gray-300">{gender}</p>
                </div>
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">Department</label>
                  <p className="text-gray-300">{department}</p>
                </div>
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">Username</label>
                  <p className="text-gray-300">{userName}</p>
                </div>
                <div className="p-3 border rounded-lg border-gray-300">
                  <label className="block text-sm font-medium text-white">Password</label>
                  <p className="text-gray-300">{password}</p>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <span className="text-red-700">{err}</span>
              </div>
            </div>
            <div className="flex justify-end p-6 bg-black rounded-b">
              <button
                className="text-red-500 font-bold uppercase px-6 py-2 text-sm focus:outline-none transition-colors duration-300 hover:text-red-700"
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
        </div>
      </div>






    </>
  )
}

export default TrainerDetailTab
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../api/axios'
import { toast, Toaster } from 'react-hot-toast'
import UserDetail from '../userDetail'
import Loader from '../loader'
import { CgSpinner } from 'react-icons/cg'


function MyProfileTab() {
  const { token } = useSelector((state) => state.User)
  const [user, setUser] = useState({})
  const [change, setChange] = useState(false)
  const [edit, setEdit] = useState(false)
  const [submitLoad, setSubmitLoad] = useState(false)
  const [name, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [newMob, setNewMob] = useState(null)
  const [profileImage, setNewProfile] = useState('')
  const [loader, setLoader] = useState(true)
  const [err, setErr] = useState('')
  const regex_mobile = /^\d{10}$/


  useEffect(() => {
    axiosInstance.get('/user/profile', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setLoader(false)
      setUser(res?.data?.user)
      setNewName(res?.data?.user?.name)
      setPhone(res?.data?.user?.phone)
      setNewProfile(res?.data?.user?.profileImage)
    }).catch((error) => {
      if (error.response.data) {
        toast.error(error.response.data.errMsg)
      } else {
        toast.error(error.message)
      }
    })
  }, [change])

  const submitEdits = async () => {
    setErr('')
    let mobile = newMob || phone
    if (name.trim().length == 0) {
      setErr("Fill all the fields")
    } else if (regex_mobile.test(mobile) == false) {
      setErr("Enter valid mobile number")
    } else {
      axiosInstance.patch('/user/editProfile', { name, profileImage, mobile }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
        setEdit(false)
        setSubmitLoad(false)
        setChange(!change)
      }).catch((error) => {
        if (error?.response?.data) {
          toast.error(error.response.data.errMsg)
          setSubmitLoad(false)
        } else {
          setSubmitLoad(false)
        }
      })
    }
  }

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (img) => {
    if (isValidImage(img.target.files[0].name)) {
      let reader = new FileReader()
      reader.readAsDataURL(img.target.files[0])
      reader.onload = () => {
        setNewProfile(reader.result)
      }
      reader.onerror = (err) => {
        console.log(err);
      }
    } else {
      toast.error('Add valid image')
    }
  };


  return (
    <>
      <div className="capitalize bg-[url('')] min-h-screen bg-cover bg-fixed">
        {loader ? <Loader /> :
          edit ?
            <>
              <div className="justify-center bg-transparent items-center flex overflow-x-hidden overflow-y-auto disableBar fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto max-h-full my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Edit Details
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className='px-5'>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-2">
                                  <input type="text"
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Name"
                                    value={name}
                                    name="firstName"
                                    id="firstName"
                                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                              </div>
                              <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    onChange={(e) => setNewMob(e.target.value)}
                                    placeholder="Phone"
                                    value={phone}
                                    name="newMob"
                                    id="newMob"
                                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className=''>
                                <div>
                                  <div className='md:flex'>
                                    <img
                                      src={profileImage ? profileImage : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                      alt="...."
                                      className="avatar"
                                    />
                                  </div>
                                  <div className="pt-5">
                                    <input
                                      type="file"
                                      name="photo"
                                      acceptedfiles=".jpg,.jpeg,.png"
                                      id="file"
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='flex justify-center'>
                              <span className='text-red-700'>{err}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {

                          setEdit(false)
                        }
                        }
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setSubmitLoad(true)
                          submitEdits()
                        }}
                      >{submitLoad ? <CgSpinner size={20} className='animate-spin' /> : ''}
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </> : <UserDetail user={user} setEdit={setEdit} />
        }
      </div>
    </>
  )
}

export default MyProfileTab

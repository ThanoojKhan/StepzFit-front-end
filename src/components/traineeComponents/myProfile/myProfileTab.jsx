import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { Toaster, toast } from 'react-hot-toast';
import UserDetail from '../userDetail';
import Loader from '../../loader';
import { CgSpinner } from 'react-icons/cg';

function MyProfileTab() {
  const [user, setUser] = useState({});
  const [change, setChange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [name, setNewName] = useState('');
  const [phone, setPhone] = useState('');
  const [newMob, setNewMob] = useState(null);
  const [age, setAge] = useState('');
  const [place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [job, setJob] = useState('');
  const [organization, setOrganization] = useState('');
  const [profileImage, setNewProfile] = useState('');
  const [loader, setLoader] = useState(true);
  const [err, setErr] = useState('');
  const [taskCount, setTaskCount] = useState();
  const [foodCount, setFoodCount] = useState();
  const [metricsCount, setMetricsCount] = useState();
  const [subscriptions, setSubscriptions] = useState([]);
  const [showToaster, setShowToaster] = useState(false)

  const regex_mobile = /^\d{10}$/;

  useEffect(() => {
    setLoader(true);
    axiosInstance
      .get('/user/profile')
      .then((res) => {
        setLoader(false);
        setUser(res?.data?.user);
        setNewName(res?.data?.user?.name);
        setPhone(res?.data?.user?.phone);
        setNewProfile(res?.data?.user?.profileImage);
        setAge(res?.data?.user?.age);
        setPlace(res?.data?.user?.place);
        setDistrict(res?.data?.user?.district);
        setJob(res?.data?.user?.job);
        setOrganization(res?.data?.user?.organization);
        setTaskCount(res?.data?.taskCount);
        setFoodCount(res?.data?.foodCount);
        setMetricsCount(res?.data?.metricsCount);
        setSubscriptions(res?.data?.subscriptions);
      })
      .catch((error) => {
        setLoader(false);
        if (error.response.data) {
          setShowToaster(true)
          toast.error(error.response.data.errMsg);
        } else {
          setShowToaster(true)
          toast.error(error.message);
        }
      });
  }, [change]);

  const submitEdits = async () => {
    setErr('');
    let mobile = newMob || phone;
    if (name.trim().length === 0) {
      setErr('Fill all the fields');
    } else if (regex_mobile.test(mobile) === false) {
      setErr('Enter a valid mobile number');
    } else {
      axiosInstance
        .patch(
          '/user/editProfile',
          {
            name,
            profileImage,
            mobile,
            age,
            place,
            district,
            job,
            organization,
          },
        )
        .then((res) => {
          setShowToaster(true)
          toast.success(res.data.message);
          setEdit(false);
          setSubmitLoad(false);
          setChange(!change);
        })
        .catch((error) => {
          if (error?.response?.data) {
            setShowToaster(true)
            toast.error(error.response.data.errMsg);
            setSubmitLoad(false);
          } else {
            setSubmitLoad(false);
          }
        });
    }
  };

  function isValidImage(logo) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

    return validExtensions.includes(extension);
  }

  const handleImageChange = (img) => {
    if (isValidImage(img.target.files[0].name)) {
      let reader = new FileReader();
      reader.readAsDataURL(img.target.files[0]);
      reader.onload = () => {
        setNewProfile(reader.result);
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    } else {
      setShowToaster(true)
      toast.error('Add a valid image');
    }
  };

  return (
    <>
      {showToaster && <Toaster toastOptions={3000} />}
      <div className="min-h-screen bg-cover bg-fixed">

        {loader ? (
          <Loader />
        ) : edit ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 overflow-y-auto backdrop-blur-md">
            <div className="justify-center bg-transparent mt-10 items-center flex overflow-x-hidden overflow-y-auto disableBar outline-none focus:outline-none">
              <div className="relative w-auto max-h-full mx-auto max-w-3xl">
                <div className="flex justify-center p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Profile</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="px-5">
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 text-center sm:grid-cols-6">
                          <div className="mb-5 sm:col-span-6">
                            <div className="flex items-center justify-center">
                              <div className="relative w-80 h-80 rounded-full overflow-hidden">
                                <img
                                  src={
                                    profileImage
                                      ? profileImage
                                      : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                                  }
                                  alt="Profile"
                                  className="object-cover rounded-xl w-full h-full"
                                />
                              </div>
                            </div>
                            <div className="mt-3 text-center">
                              <input
                                type="file"
                                name="photo"
                                accept=".jpg, .jpeg, .png"
                                id="file"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="file"
                                className="cursor-pointer text-zinc-200 hover:text-indigo-500"
                              >
                                Change Profile Picture
                              </label>
                            </div>

                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Name"
                                value={name}
                                name="firstName"
                                id="firstName"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setNewMob(e.target.value)}
                                placeholder="Phone"
                                value={newMob || phone}
                                name="newMob"
                                id="newMob"
                                className="block w-full text-center p-1 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Age
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Age"
                                value={age}
                                name="age"
                                id="age"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Place
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setPlace(e.target.value)}
                                placeholder="Place"
                                value={place}
                                name="place"
                                id="place"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              District
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) =>
                                  setDistrict(e.target.value)
                                }
                                placeholder="District"
                                value={district}
                                name="district"
                                id="district"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Job
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) => setJob(e.target.value)}
                                placeholder="Job"
                                value={job}
                                name="job"
                                id="job"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 mb-3">
                            <label className="block text-sm font-medium leading-6">
                              Organization
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                onChange={(e) =>
                                  setOrganization(e.target.value)
                                }
                                placeholder="Organization"
                                value={organization}
                                name="organization"
                                id="organization"
                                className="block text-center w-full p-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-300 focus:ring-2 bg-transparent focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <span className="text-red-700">{err}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center"></div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-400 hover:text-black font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setSubmitLoad(true);
                      submitEdits();
                    }}
                  >
                    {submitLoad ? (
                      <CgSpinner size={20} className="animate-spin" />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <UserDetail
            user={user}
            foodCount={foodCount}
            taskCount={taskCount}
            metricsCount={metricsCount}
            subscriptions={subscriptions}
            setEdit={setEdit}
          />
        )}
      </div>
    </>
  );
}

export default MyProfileTab;

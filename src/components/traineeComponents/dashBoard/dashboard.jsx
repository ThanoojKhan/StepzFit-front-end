import React, { useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Cards from './cards';
import { Fade } from 'react-awesome-reveal';
import TaskTab from './taskTab';
import FoodTab from './foodTab';
import { useSelector } from 'react-redux';
import { toast,Toaster } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import ImageUpdatePopup from './ImageUpdatePopup';
import Loader from '../../loader';
import dash from '../../../assets/images/images/bg.jpg'
const HomeBody = () => {
  const { token } = useSelector((state) => state.User);
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [foodIntake, setFoodIntake] = useState([]);
  const [weight, setWeight] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [existingImage, setExistingImage] = useState('');
  const [showToaster, setShowToaster] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const link1 = '/myTasks';
  const link2 = '/foodTracker';

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/user/dashBoard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowToaster(true)
      setUser(response?.data?.user);
      setWeight(response?.data?.weight?.bodyWeight);
      setTasks(response?.data?.tasks);
      setFoodIntake(response?.data?.foodIntake);
      setExistingImage(response?.data?.user?.dashImage)
      setIsLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.errMsg);
      setIsLoading(false)
    }
  };

  const handleImageUpdateInHomeBody = (newImage) => {
    setExistingImage(newImage);
  };

  const handleUpdatePictureClick = () => {
    setPopupOpen(true);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>

      {isLoading ? <Loader /> : ''}
      {showToaster && <Toaster toastOptions={3000} />}
      <div className="min-h-screen w-full">
        <div className="mx-auto px-4 mt-24 py-8 sm:px-6 lg:px-8 ">
          <div className="py-6 px-1 overflow-hidden">
            <div className="px-4 sm:p-6" >
              <div className="space-y-4">
                <div className="text-white flex flex-col md:flex-row lg:gap-10 h-3/4 justify-center items-center ">
                  <div className="w-full md:w-1/2 flex-g m-3 text-left">
                    <div className="flex-col w3-animate-top">
                      <Fade className="w-full mb-10">
                        <div className="w-full flex flex-col mt-10 items-center relative z-10" >
                          <h1 className="text-zinc-100 font-light cursor-default lg:text-5xl md:text-4xl self-start ms-20 md:ms-0 md:self-center text-3xl w3-animate-top">
                            {user.name}
                          </h1>
                          <h1 className="absolute cursor-default text-zinc-500/10 lg:left-52 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10 w3-animate-zoom">
                            Heyy !!!
                          </h1>
                        </div>
                      </Fade>
                    </div>
                    <div className="align-bottom my-6 w3-animate-left">
                      <Fade>
                        <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg z-10">
                          <h1 className="absolute cursor-default text-zinc-500/20 md:-left-3 left-0 lg:text-8xl md:text-7xl text-6xl font-light lg:-top-36 md:-top-20 -top-16 -z-10 ">Heyy !!!</h1>
                        </div>
                        <div className="md:hidden md:w-1/2 h-3/5 w3-aniamte-zoom ">
                          <span className="m-4 flex-col justify-center text-center">
                            <img
                              src={existingImage ? existingImage : dash}
                              alt=""
                              className="w-full h-full object-cover rounded-2xl shadow-2xl"
                            />
                            <h5 onClick={handleUpdatePictureClick} className='mt-5 cursor-pointer hover:scale-105 transition-transform text-zinc-200'>Update Picture</h5>
                          </span>
                        </div>
                        <h1 className="text-zinc-200 mt-16 mb-4 cursor-default text-xl">Monitor all your data in the easiest way</h1>
                        <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>

                      </Fade>
                    </div>
                    <Cards weight={weight} trainer={user.trainerId} />
                  </div>
                  <div className="hidden md:flex items-center md:w-1/2 h-2/5 max-h-96 max-w-xl w3-animate-zoom">
                    <span className="m-4 flex-col justify-center text-center">
                      <img
                        src={existingImage ? existingImage : dash}
                        alt=""
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="relative">
                        <h5 onClick={() => setPopupOpen(true)} className='mt-5 cursor-pointer hover:scale-105 transition-transform text-zinc-200'>Update Picture</h5>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ImageUpdatePopup isOpen={isPopupOpen} existingImage={existingImage} onClose={() => setPopupOpen(false)} onUpdate={handleImageUpdateInHomeBody} />
          <div className="px-5 mx-1 flex flex-col xl:flex-row">
            <div className="px-4 flex-col w-full my-5">
              <TaskTab title="Tasks" items={tasks} link={link1} />
            </div>
            <div className="px-4 flex-col w-full my-5">
              <FoodTab title="Food Intake" items={foodIntake} link={link2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBody;

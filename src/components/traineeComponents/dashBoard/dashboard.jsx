import React, { useEffect, useState, Suspense } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { Fade } from 'react-awesome-reveal';
import { toast, Toaster } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import dash from '../../../assets/images/images/bg.jpg';

const Cards = React.lazy(() => import('./Cards'));
const TaskTab = React.lazy(() => import('./TaskTab'));
const FoodTab = React.lazy(() => import('./FoodTab'));
const ImageUpdatePopup = React.lazy(() => import('./ImageUpdatePopup'));

const HomeBody = () => {
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [foodIntake, setFoodIntake] = useState([]);
  const [weight, setWeight] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [existingImage, setExistingImage] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const link1 = '/myTasks';
  const link2 = '/foodTracker';

  const fetchDashboard = async () => {
    try {
      const cachedData = localStorage.getItem('dashboardData');
      const cachedVersion = localStorage.getItem('dashboardDataVersion');

      if (cachedData) {
        const cachedDashboardData = JSON.parse(cachedData);
        setUser(cachedDashboardData.user);
        setWeight(cachedDashboardData.weight);
        setTasks(cachedDashboardData.tasks);
        setFoodIntake(cachedDashboardData.foodIntake);
        setExistingImage(cachedDashboardData.dashImage);
      }

      const response = await axiosInstance.get('/user/dashBoard');
      const data = response?.data;

      if (!cachedData || cachedVersion !== data.version) {
        setUser(data.user);
        setWeight(data.weight?.bodyWeight);
        setTasks(data.tasks);
        setFoodIntake(data.foodIntake);
        setExistingImage(data.user?.dashImage);

        const updatedCachedData = {
          user: data.user,
          weight: data.weight?.bodyWeight,
          tasks: data.tasks,
          foodIntake: data.foodIntake,
          dashImage: data.user?.dashImage,
        };
        localStorage.setItem('dashboardData', JSON.stringify(updatedCachedData));
        localStorage.setItem('dashboardDataVersion', data.version);
      }

      setIsLoading(false);
      setShowToaster(true);
    } catch (error) {
      toast.error(error?.response?.data?.errMsg);
      setIsLoading(false);
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
      {showToaster && <Toaster toastOptions={3000} />}
      <div className="min-h-screen w-full">
        <div className="mx-auto px-4 mt-24 py-8 sm:px-6 lg:px-8 ">
          <div className="py-6 px-1 overflow-hidden">
            <div className="px-4 sm:p-6">
              <div className="space-y-4">
                <div className="text-white flex flex-col md:flex-row lg:gap-10 h-3/4 justify-center items-center ">
                  <div className="w-full md:w-1/2 flex-g m-3 text-left">
                    <div className="flex-col w3-animate-top">
                      <Fade className="w-full mb-10">
                        <div className="w-full flex flex-col mt-10 items-center relative z-10">
                          <h1 className="text-zinc-100 font-light cursor-default lg:text-5xl md:text-4xl self-start ms-20 md:ms-0 md:self-center text-3xl w3-animate-top">
                            {isLoading ? (
                              <div className='bg-gray-300 h-16 rounded animate-pulse'></div>
                            ) : (
                              user.name
                            )}

                          </h1>
                          <h1 className="absolute cursor-default text-zinc-500/10 lg:left-52 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10 w3-animate-zoom">
                            Heyy !!!
                          </h1>
                        </div>
                      </Fade>
                    </div>
                    <div className="align-bottom my-6 w3-animate-left">
                      <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg z-10">
                        <h1 className="absolute cursor-default text-zinc-500/20 md:-left-3 left-0 lg:text-8xl md:text-7xl text-6xl font-light lg:-top-36 md:-top-20 -top-16 -z-10 ">Heyy !!!</h1>
                      </div>
                      <div className="md:hidden md:w-1/2 h-3/5 w3-aniamte-zoom ">
                        <span className="m-4 flex-col justify-center text-center">
                          {isLoading ? (
                            <div className='w-full h-full object-cover rounded-2xl shadow-2xl bg-gray-300 animate-pulse'></div>
                          ) : (
                            <img
                              src={existingImage ? existingImage : dash}
                              alt=""
                              className="w-full h-full object-cover rounded-2xl shadow-2xl"
                            />
                          )}
                          <h5 onClick={handleUpdatePictureClick} className='mt-5 cursor-pointer hover:scale-105 transition-transform text-zinc-200'>Update Picture</h5>
                        </span>
                      </div>
                      <h1 className="text-zinc-200 mt-16 mb-4 cursor-default text-xl">Monitor all your data in the easiest way </h1>
                      <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>
                    </div>
                    <Suspense fallback={<Loader />}>
                      <Cards weight={weight} trainer={user.trainerId} />
                    </Suspense>
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
          <Suspense fallback={<Loader />}>
            <ImageUpdatePopup isOpen={isPopupOpen} existingImage={existingImage} onClose={() => setPopupOpen(false)} onUpdate={handleImageUpdateInHomeBody} />
          </Suspense>
          <div className="px-5 mx-1 flex flex-col xl:flex-row">
            <div className="px-4 flex-col w-full my-5">
              <Suspense fallback={<Loader />}>
                <TaskTab title="Tasks" items={tasks} link={link1} />
              </Suspense>
            </div>
            <div className="px-4 flex-col w-full my-5">
              <Suspense fallback={<Loader />}>
                <FoodTab title="Food Intake" items={foodIntake} link={link2} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBody;

import React, { useEffect, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { Fade } from 'react-awesome-reveal';
import { toast, Toaster } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import Loader from '../../loader';
import PlanBarChart from './chart'
import CountBarChart from './count'
import TraineeTab from './traineeTab'
import TrainerTab from './trainerTab'

const HomeBody = () => {
  const [user, setUser] = useState([]);
  const [userCount, setUserCount] = useState();
  const [tasksCount, setTasksCount] = useState();
  const [trainer, setTrainer] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showToaster, setShowToaster] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const link1 = '/trainer/traineesData';
  const link2 = '/trainer/taskScheduler';

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/trainer/dashBoard');
      setShowToaster(true)
      setUser(response?.data?.trainees);
      setTrainer(response?.data?.trainer);
      setTasks(response?.data?.tasks);
      setUserCount(response?.data?.userCount)
      setTasksCount(response?.data?.tasksCount)
      setIsLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.errMsg);
      setIsLoading(false)
    }
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
                            {trainer?.firstName}
                          </h1>
                          <div>
                            <h1 className="absolute cursor-default text-zinc-500/10 lg:left-52 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10 w3-animate-zoom">
                              Heyy !!!
                            </h1>
                          </div>
                        </div>
                      </Fade>
                    </div>
                    <div className="align-bottom my-6 w3-animate-left">
                      <Fade>
                        <div className="flex flex-col mt-10 items-start relative before:absolute before:-bottom-6 before:left-0 before:w-20 before:h-1 before:rounded-lg z-10">
                          <h1 className="absolute cursor-default text-zinc-500/20 md:-left-3 left-0 lg:text-8xl md:text-7xl text-6xl font-light lg:-top-36 md:-top-20 -top-16 -z-10 ">Heyy !!!</h1>
                        </div>
                        <h1 className="text-zinc-200 mt-16 mb-4 cursor-default text-xl">Monitor all your data in the easiest way</h1>
                        {/* <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p> */}
                      </Fade>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 mx-1 w-full flex justify-center flex-col xl:flex-row">
            <div className="px-4 my-5">
              <PlanBarChart data={tasksCount} />
            </div>
            <div className="px-4 my-5">
              <CountBarChart data={userCount} />
            </div>
          </div>
          <div className="px-5 mx-1 flex flex-col xl:flex-row">
            <div className="px-4 flex-col w-full my-5">
              <TraineeTab title="Trainees" items={user} link={link1} />
            </div>
            <div className="px-4 flex-col w-full my-5">
              <TrainerTab title="Tasks" items={tasks} link={link2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBody;

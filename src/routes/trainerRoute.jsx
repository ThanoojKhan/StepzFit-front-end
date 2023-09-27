import TrainerDashboard from '../pages/trainer/mainPages/dashboard';
import Messages from '../pages/trainer/mainPages/messages';
import TaskScheduler from '../pages/trainer/mainPages/taskScheduler';
import TraineesData from '../pages/trainer/mainPages/traineesData';
import MyProfile from '../pages/trainer/mainPages/myProfile';
import BodyMetrics from '../pages/trainer/traineeData/bodyMetrics';
import FoodIntake from '../pages/trainer/traineeData/foodIntake';
import ScheduleTask from '../pages/trainer/taskScheduler/scheduleTask';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/errorPages/notFound';

function TrainerRoute() {

  return (
    <div>
      <ProtectedRoute path="/" userType="trainer" tokenCheck={true} element={<TrainerDashboard />} />
      <ProtectedRoute path="/dashBoard" userType="trainer" tokenCheck={true} element={<TrainerDashboard />} />
      <ProtectedRoute path="/messages" userType="trainer" tokenCheck={true} element={<Messages />} />
      <ProtectedRoute path="/taskScheduler" userType="trainer" tokenCheck={true} element={<TaskScheduler />} />
      <ProtectedRoute path="/traineesData" userType="trainer" tokenCheck={true} element={<TraineesData />} />
      <ProtectedRoute path="/myProfile" userType="trainer" tokenCheck={true} element={<MyProfile />} />
      <ProtectedRoute path="/bodyMetrics/:traineeId" userType="trainer" tokenCheck={true} element={<BodyMetrics />} />
      <ProtectedRoute path="/foodIntake/:traineeId" userType="trainer" tokenCheck={true} element={<FoodIntake />} />
      <ProtectedRoute path="/scheduleTask/:traineeId" userType="trainer" tokenCheck={true} element={<ScheduleTask />} />
      <ProtectedRoute path="*" userType="trainer" element={<NotFound />} />
    </div>
  );
}

export default TrainerRoute;

import { Route, Routes } from 'react-router-dom'
import NotFound from '../pages/errorPages/notFound'
import TrainerDashboard from '../pages/trainer/mainPages/dashboard'
import Messages from '../pages/trainer/mainPages/messages'
import MyProfile from '../pages/trainer/mainPages/myProfile'
import TaskScheduler from '../pages/trainer/mainPages/taskScheduler'
import TraineesData from '../pages/trainer/mainPages/traineesData'
import ScheduleTask from '../pages/trainer/taskScheduler/scheduleTask'
import BodyMetrics from '../pages/trainer/traineeData/bodyMetrics'
import FoodIntake from '../pages/trainer/traineeData/foodIntake'
import ProtectedRoute from './ProtectedRoute'

function TrainerRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute userType="trainer" component={TrainerDashboard} />} />
        <Route path="/dashboard" element={<ProtectedRoute userType="trainer" component={TrainerDashboard} />} />
        <Route path="/messages" element={<ProtectedRoute userType="trainer" component={Messages} />} />
        <Route path="/taskScheduler" element={<ProtectedRoute userType="trainer" component={TaskScheduler} />} />
        <Route path="/traineesData" element={<ProtectedRoute userType="trainer" component={TraineesData} />} />
        <Route path="/myProfile" element={<ProtectedRoute userType="trainer" component={MyProfile} />} />
        <Route path="/bodyMetrics/:traineeId" element={<ProtectedRoute userType="trainer" component={BodyMetrics} />} />
        <Route path="/foodIntake/:traineeId" element={<ProtectedRoute userType="trainer" component={FoodIntake} />} />
        <Route path="/scheduleTask/:traineeId" element={<ProtectedRoute userType="trainer" component={ScheduleTask} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default TrainerRoute

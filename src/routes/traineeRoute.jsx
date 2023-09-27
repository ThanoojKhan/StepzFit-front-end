import { Route, Routes } from 'react-router-dom'
import AddBodyMetrics from '../components/traineeComponents/bodyMetrics/addBodyMetricsTab'
import EditBodyMetrics from '../components/traineeComponents/bodyMetrics/editBodyMetricsTab'
import PaymentFailed from '../components/traineeComponents/payFail'
import PaymentSuccess from '../components/traineeComponents/paySuccess'
import NotFound from '../pages/errorPages/notFound'
import MyPlan from '../pages/planDetailsPage/myPlan'
import Plans from '../pages/planDetailsPage/plans'
import BodyMetrics from '../pages/users/bodyMetrics'
import Dashboard from '../pages/users/dashBoard'
import FoodTracker from '../pages/users/foodTracker'
import Messages from '../pages/users/messages'
import MyProfile from '../pages/users/myProfile'
import MyTasks from '../pages/users/myTasks'
import ProtectedRoute from './ProtectedRoute'

function TraineeRoute() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute userType="user" component={Dashboard} />} />
        <Route path="/dashboard" element={<ProtectedRoute userType="user" component={Dashboard} />} />
        <Route path="/profile" element={<ProtectedRoute userType="user" component={MyProfile} />} />
        <Route path="/messages" element={<ProtectedRoute userType="user" component={Messages} />} />
        <Route path="/myTasks" element={<ProtectedRoute userType="user" component={MyTasks} />} />
        <Route path="/bodyMetrics" element={<ProtectedRoute userType="user" component={BodyMetrics} />} />
        <Route path="/addBodyMetrics" element={<ProtectedRoute userType="user" component={AddBodyMetrics} />} />
        <Route path="/editBodyMetrics/:bodyMetricsId" element={<ProtectedRoute userType="user" component={EditBodyMetrics} />} />
        <Route path="/foodTracker" element={<ProtectedRoute userType="user" component={FoodTracker} />} />
        <Route path="/myProfile" element={<ProtectedRoute userType="user" component={MyProfile} />} />
        <Route path="/paymentSuccess" element={<ProtectedRoute userType="user" component={PaymentSuccess} />} />
        <Route path="/paymentFailed" element={<ProtectedRoute userType="user" component={PaymentFailed} />} />
        <Route path="/myPlan" element={<ProtectedRoute userType="user" component={MyPlan} />} />
        <Route path="/plans" element={<ProtectedRoute userType="user" component={Plans} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default TraineeRoute

import Messages from '../pages/users/messages'
import MyTasks from '../pages/users/myTasks'
import BodyMetrics from '../pages/users/bodyMetrics'
import AddBodyMetrics from '../components/traineeComponents/bodyMetrics/addBodyMetricsTab'
import MyProfile from '../pages/users/myProfile'
import FoodTracker from '../pages/users/foodTracker'
import EditBodyMetrics from '../components/traineeComponents/bodyMetrics/editBodyMetricsTab'
import Dashboard from '../pages/users/dashBoard'
import PaymentSuccess from '../components/traineeComponents/paySuccess'
import PaymentFailed from '../components/traineeComponents/payFail'
import MyPlan from '../pages/planDetailsPage/myPlan'
import Plans from '../pages/planDetailsPage/plans'
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/errorPages/notFound'

function TraineeRoute() {
  return (
    <div>
      <ProtectedRoute path="/dashboard" userType="user" tokenCheck={true} element={<Dashboard />} />
      <ProtectedRoute path="/profile" userType="user" tokenCheck={true} element={<MyProfile />} />
      <ProtectedRoute path="/messages" userType="user" tokenCheck={true} element={<Messages />} />
      <ProtectedRoute path="/myTasks" userType="user" tokenCheck={true} element={<MyTasks />} />
      <ProtectedRoute path="/bodyMetrics" userType="user" tokenCheck={true} element={<BodyMetrics />} />
      <ProtectedRoute path="/addBodyMetrics" userType="user" tokenCheck={true} element={<AddBodyMetrics />} />
      <ProtectedRoute path="/editBodyMetrics/:bodyMetricsId" userType="user" tokenCheck={true} element={<EditBodyMetrics />} />
      <ProtectedRoute path="/foodTracker" userType="user" tokenCheck={true} element={<FoodTracker />} />
      <ProtectedRoute path="/myProfile" userType="user" tokenCheck={true} element={<MyProfile />} />
      <ProtectedRoute path="/paymentSuccess" userType="user" tokenCheck={true} element={<PaymentSuccess />} />
      <ProtectedRoute path="/paymentFailed" userType="user" tokenCheck={true} element={<PaymentFailed />} />
      <ProtectedRoute path="/myPlan" userType="user" tokenCheck={true} element={<MyPlan />} />
      <ProtectedRoute path="/plans" userType="user" tokenCheck={true} element={<Plans />} />
      <ProtectedRoute path="*" userType="user" element={<NotFound />} />
    </div>
  )
}

export default TraineeRoute

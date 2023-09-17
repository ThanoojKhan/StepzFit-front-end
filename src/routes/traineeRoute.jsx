import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Messages from '../pages/users/messages'
import MyTasks from '../pages/users/myTasks'
import BodyMetrics from '../pages/users/bodyMetrics'
import AddBodyMetrics from '../components/traineeComponents/bodyMetrics/addBodyMetricsTab'
import MyProfile from '../pages/users/myProfile'
import FoodTracker from '../pages/users/foodTracker'
import EditBodyMetrics from '../components/traineeComponents/bodyMetrics/editBodyMetricsTab'
import Register from '../pages/users/register'
import Dashboard from '../pages/users/dashBoard'
import UserLogin from '../pages/users/login'
import EmailVerify from '../components/traineeComponents/emailVerify'
import OtpLogin from '../components/traineeComponents/otpLogin'
import ResetPassword from '../components/traineeComponents/resetPassword'
import PaymentSuccess from '../components/traineeComponents/paySuccess'
import PaymentFailed from '../components/traineeComponents/payFail'
import MyPlan from '../pages/planDetailsPage/myPlan'
import Plans from '../pages/planDetailsPage/plans'
import Home from '../pages/landingPage/home'
import NotFound from '../pages/errorPages/notFound'

function TraineeRoute() {
  const user = useSelector((state) => state.User)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={user.token !== null ? <Dashboard /> : <Navigate to='/home' />} />
        <Route path='/register' element={user.token !== null ? <Navigate to='/home' /> : <Register />} />
        <Route path='/login' element={user.token !== null ? <Navigate to='/home' /> : <UserLogin />} />
        <Route path='/profile' element={user.token !== null ? <MyProfile /> : <Navigate to='/login' />} />
        <Route path="/emailVerify/:userId" element={user.token !== null ? <Navigate to='/home' /> : <EmailVerify />} />
        <Route path="/resetPassword/:userId" element={user.token !== null ? <Navigate to='/home' /> : <ResetPassword />} />
        <Route path='/otpLogin' element={user.token !== null ? <Navigate to='/home' /> : <OtpLogin />} />
        <Route path='/messages' element={user.token ? <Messages /> : <Navigate to='/login' />} />
        <Route path='/myTasks' element={user.token ? <MyTasks /> : <Navigate to='/login' />} />
        <Route path='/bodyMetrics' element={user.token ? <BodyMetrics /> : <Navigate to='/login' />} />
        <Route path='/addBodyMetrics' element={user.token ? <AddBodyMetrics /> : <Navigate to='/login' />} />
        <Route path='/editBodyMetrics/:bodyMetricsId' element={user?.token ? <EditBodyMetrics /> : <Navigate to='/login' />} />
        <Route path='/foodTracker' element={user.token ? <FoodTracker /> : <Navigate to='/login' />} />
        <Route path='/myProfile' element={user.token ? <MyProfile /> : <Navigate to='/login' />} />
        <Route path='/paymentSuccess' element={user.token ? <PaymentSuccess /> : <Navigate to='/login' />} />
        <Route path='/paymentFailed' element={user.token ? <PaymentFailed /> : <Navigate to='/login' />} />
        <Route path='/myPlan' element={user.token ? <MyPlan /> : <Navigate to='/login' />} />
        <Route path='/plans' element={user.token ? <Plans /> : <Navigate to='/login' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default TraineeRoute

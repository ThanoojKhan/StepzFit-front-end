import { Routes ,Route,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Messages from '../pages/users/messages'
import MyTasks from '../pages/users/myTasks'
import BodyMetrics from '../pages/users/bodyMetrics'
import AddBodyMetrics from '../components/traineeComponents/bodyMetrics/addBodyMetricsTab'
import MyProfile from '../pages/users/myProfile'
import FoodTracker from '../pages/users/foodTracker'
import EditBodyMetrics from '../components/traineeComponents/bodyMetrics/editBodyMetricsTab'
import Register from '../pages/users/register'
import Home from '../pages/users/dashBoard'
import LandingPage from '../pages/landingPage/Home'
import UserLogin from '../pages/users/login'
import EmailVerify from '../components/traineeComponents/emailVerify'
import OtpLogin from '../components/traineeComponents/otpLogin'
import ResetPassword from '../components/traineeComponents/resetPassword'

function TraineeRoute() {
  const user = useSelector((state)=>state.User)
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/home' element = {<LandingPage/>}/>
        <Route path='/register' element = {user.token!==null ?<Navigate to='/'/> :<Register/>} />
        <Route path='/login' element = {user.token!==null ?<Navigate to='/'/> :<UserLogin/>} />
        <Route path='/profile' element = {user.token!==null ?<MyProfile /> :<Navigate to='/login'/>}/>
        <Route path="/emailVerify/:userId" element={<EmailVerify/>}/>
        <Route path="/resetPassword/:userId" element={<ResetPassword/>}/>
        <Route path='/otpLogin' element={<OtpLogin/>}/>
        <Route path='/messages' element = {user?.token ? <Messages/> : <Navigate to='/login'/>}/>
        <Route path='/myTasks' element = {user?.token ? <MyTasks/> : <Navigate to='/login'/>}/>
        <Route path='/bodyMetrics' element = {user?.token ? <BodyMetrics/> : <Navigate to='/login'/>}/>
        <Route path='/addBodyMetrics' element = {user?.token ? <AddBodyMetrics/> : <Navigate to='/login'/>}/>
        <Route path='/editBodyMetrics/:bodyMetricsId' element = {user?.token ? <EditBodyMetrics/> : <Navigate to='/login'/>}/>
        <Route path='/foodTracker' element = {user?.token ? <FoodTracker/> : <Navigate to='/login'/>}/>
        <Route path='/myProfile' element = {user?.token ? <MyProfile/> : <Navigate to='/login'/>}/>
      </Routes>
      </div>
  )
}

export default TraineeRoute

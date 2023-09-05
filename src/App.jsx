import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
{/* TRAINEE */}
import Register from './pages/users/register'
import Home from './pages/users/dashBoard'
import LandingPage from './pages/landingPage/Home'
import UserLogin from './pages/users/login'
import MyProfile from './pages/users/myProfile'
import EmailVerify from './components/traineeComponents/emailVerify'
import OtpLogin from './components/traineeComponents/otpLogin'
import ResetPassword from './components/traineeComponents/resetPassword'
import TraineeRoute from './routes/traineeRoute'

{/* ADMIN */}
import AdminRoute from './routes/adminRoute'
import AdminLogin from './pages/admin/mainPages/login'
{/* TRAINER */}
import TrainerRoute from './routes/trainerRoute'
import TrainerLogin from './pages/trainer/mainPages/login'

function App() {
  const user = useSelector((state)=>state.User)
  const admin = useSelector((state)=>state.Admin)
  const trainer = useSelector((state)=>state.Trainer)

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/home' element = {<LandingPage/>}/>
        <Route path='/register' element = {user.token!==null ?<Navigate to='/'/> :<Register/>} />
        <Route path='/login' element = {user.token!==null ?<Navigate to='/'/> :<UserLogin/>} />
        <Route path='/profile' element = {user.token!==null ?<MyProfile /> :<Navigate to='/login'/>}/>
        <Route path="/emailVerify/:userId" element={<EmailVerify/>}/>
        <Route path="/resetPassword/:userId" element={<ResetPassword/>}/>
        <Route path='/otpLogin' element={<OtpLogin/>}/>
        <Route path='/*' element = { <TraineeRoute/>}/>

        {/* TRAINER */}

        <Route path='trainer/login' element = {trainer?.token ? <Navigate to='/trainer'/> :<TrainerLogin/>} />     
        <Route path='/trainer/*' element = { <TrainerRoute/>}/>

        {/* ADMIN */}

        <Route path='admin/login' element = {admin?.token ? <Navigate to='/admin'/> :<AdminLogin/>} />     
        <Route path='/admin/*' element ={ <AdminRoute/>}/>
      </Routes>
    </Router>
  )
}

export default App

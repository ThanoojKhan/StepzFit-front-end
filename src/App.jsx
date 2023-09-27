import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

{/* TRAINEE */ }
import TraineeRoute from './routes/traineeRoute'
import Register from './pages/users/register'
import UserLogin from './pages/users/login'
import EmailVerify from './components/traineeComponents/emailVerify'
import ResetPassword from './components/traineeComponents/resetPassword'

{/* ADMIN */ }
import AdminRoute from './routes/adminRoute'
import AdminLogin from './pages/admin/mainPages/login'

{/* TRAINER */ }
import TrainerRoute from './routes/trainerRoute'
import TrainerLogin from './pages/trainer/mainPages/login'

{/* ERROR PAGES */ }
import NotFound from './pages/errorPages/notFound'
import AccessDenied from './pages/errorPages/accessDenied'
import ServerError from './pages/errorPages/serverError'

{/* HOME PAGES */ }
import Home from './pages/landingPage/home'
import Plans from './pages/planDetailsPage/planDetailsPage'

function App() {
  const admin = useSelector((state) => state.Admin)
  const trainer = useSelector((state) => state.Trainer)
  const user = useSelector((state) => state.User)

  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/membershipPlans/:planId' element={<Plans />} />

        {/* USER */}
        <Route path='/*' element={<TraineeRoute />} />
        <Route path='/login' element={user.token !== null ? <Navigate to='/home' /> : <UserLogin />} />
        <Route path="/emailVerify/:userId" element={user.token !== null ? <Navigate to='/home' /> : <EmailVerify />} />
        <Route path='/register' element={user.token !== null ? <Navigate to='/home' /> : <Register />} />
        <Route path="/resetPassword/:userId" element={user.token !== null ? <Navigate to='/home' /> : <ResetPassword />} />
        <Route path='/otpLogin' element={user.token !== null ? <Navigate to='/home' /> : <OtpLogin />} />

        {/* TRAINER */}
        <Route path='trainer/login' element={trainer?.token ? <Navigate to='/trainer' /> : <TrainerLogin />} />
        <Route path='/trainer/*' element={<TrainerRoute />} />

        {/* ADMIN */}
        <Route path='admin/login' element={admin?.token ? <Navigate to='/admin' /> : <AdminLogin />} />
        <Route path='/admin/*' element={<AdminRoute />} />

        {/* ERROR PAGES */}
        <Route path='/accessDenied' element={<AccessDenied />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path='/serverError' element={<ServerError />} />

      </Routes>
    </Router>
  )
}

export default App

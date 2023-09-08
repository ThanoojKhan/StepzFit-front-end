import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

{/* TRAINEE */ }
import TraineeRoute from './routes/traineeRoute'
{/* ADMIN */ }
import AdminRoute from './routes/adminRoute'
import AdminLogin from './pages/admin/mainPages/login'
{/* TRAINER */ }
import TrainerRoute from './routes/trainerRoute'
import TrainerLogin from './pages/trainer/mainPages/login'
import NotFound from './pages/errorPages/notFound'

function App() {
  const admin = useSelector((state) => state.Admin)
  const trainer = useSelector((state) => state.Trainer)

  return (
    <Router>
      <Routes>
        {/* ERROR PAGES */}

        <Route path='/accessDenied' element = {<NotFound/>}/>
        <Route path='/notFound' element = {<NotFound/>}/>
        <Route path='/serverError' element = {<NotFound/>}/>

        {/* USER */}
        <Route path='/*' element={<TraineeRoute />} />

        {/* TRAINER */}
        <Route path='trainer/login' element={trainer?.token ? <Navigate to='/trainer' /> : <TrainerLogin />} />
        <Route path='/trainer/*' element={<TrainerRoute />} />

        {/* ADMIN */}
        <Route path='admin/login' element={admin?.token ? <Navigate to='/admin' /> : <AdminLogin />} />
        <Route path='/admin/*' element={<AdminRoute />} />
      </Routes>
    </Router>
  )
}

export default App

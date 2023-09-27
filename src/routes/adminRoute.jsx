import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../pages/admin/mainPages/dashboard'
import Messages from '../pages/admin/mainPages/messages'
import Plans from '../pages/admin/mainPages/plans'
import Trainers from '../pages/admin/mainPages/trainers'
import Users from '../pages/admin/mainPages/users'
import AddPlan from '../pages/admin/planPages/addPlan'
import UpdatePlan from '../pages/admin/planPages/updatePlan'
import AddTrainer from '../pages/admin/trainerRelated/addTrainer'
import AssignTrainer from '../pages/admin/trainerRelated/assignTrainer'
import TrainerDetails from '../pages/admin/trainerRelated/trainerDetails'
import UpdateTrainer from '../pages/admin/trainerRelated/updateTrainer'
import NotFound from '../pages/errorPages/notFound'
import ProtectedRoute from './ProtectedRoute'

function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute userType="admin" component={AdminDashboard} />} />
        <Route path="/dashboard" element={<ProtectedRoute userType="admin" component={AdminDashboard} />} />
        <Route path="/users" element={<ProtectedRoute userType="admin" component={Users} />} />
        <Route path="/messages" element={<ProtectedRoute userType="admin" component={Messages} />} />
        <Route path="/trainers" element={<ProtectedRoute userType="admin" component={Trainers} />} />
        <Route path="/plans" element={<ProtectedRoute userType="admin" component={Plans} />} />
        <Route path="/addTrainer" element={<ProtectedRoute userType="admin" component={AddTrainer} />} />
        <Route path="/addPlan" element={<ProtectedRoute userType="admin" component={AddPlan} />} />
        <Route path="/updatePlan/:planId" element={<ProtectedRoute userType="admin" component={UpdatePlan} />} />
        <Route path="/assignTrainer" element={<ProtectedRoute userType="admin" component={AssignTrainer} />} />
        <Route path="/updateTrainer/:trainerId" element={<ProtectedRoute userType="admin" component={UpdateTrainer} />} />
        <Route path="/trainerDetails/:trainerId" element={<ProtectedRoute userType="admin" component={TrainerDetails} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AdminRoute
import AdminDashboard from '../pages/admin/mainPages/dashboard'
import Users from '../pages/admin/mainPages/users'
import Trainers from '../pages/admin/mainPages/trainers'
import Messages from '../pages/admin/mainPages/messages'
import Plans from '../pages/admin/mainPages/plans'
import AddTrainer from '../pages/admin/trainerRelated/addTrainer'
import UpdateTrainer from '../pages/admin/trainerRelated/updateTrainer'
import TrainerDetails from '../pages/admin/trainerRelated/trainerDetails'
import AssignTrainer from '../pages/admin/trainerRelated/assignTrainer'
import AddPlan from '../pages/admin/planPages/addPlan'
import UpdatePlan from '../pages/admin/planPages/updatePlan'
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/errorPages/notFound'



function AdminRoute() {
  return (
    <div>
      <ProtectedRoute path="/" userType="admin" tokenCheck={true} element={<AdminDashboard />} />
      <ProtectedRoute path="/users" userType="admin" tokenCheck={true} element={<Users />} />
      <ProtectedRoute path="/messages" userType="admin" tokenCheck={true} element={<Messages />} />
      <ProtectedRoute path="/trainers" userType="admin" tokenCheck={true} element={<Trainers />} />
      <ProtectedRoute path="/plans" userType="admin" tokenCheck={true} element={<Plans />} />
      <ProtectedRoute path="/addTrainer" userType="admin" tokenCheck={true} element={<AddTrainer />} />
      <ProtectedRoute path="/addPlan" userType="admin" tokenCheck={true} element={<AddPlan />} />
      <ProtectedRoute path="/updatePlan/:planId" userType="admin" tokenCheck={true} element={<UpdatePlan />} />
      <ProtectedRoute path="/assignTrainer" userType="admin" tokenCheck={true} element={<AssignTrainer />} />
      <ProtectedRoute path="/updateTrainer/:trainerId" userType="admin" tokenCheck={true} element={<UpdateTrainer />} />
      <ProtectedRoute path="/trainerDetails/:trainerId" userType="admin" tokenCheck={true} element={<TrainerDetails />} />
      <ProtectedRoute path="*" userType="admin" element={<NotFound />} />
    </div>
  )
}

export default AdminRoute
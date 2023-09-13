import { Routes ,Route,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import NotFound from '../pages/errorPages/notFound'



function AdminRoute() {
  const admin = useSelector((state)=>state.Admin)
  return (
    <div>
        <Routes>
        <Route path='/' element = {admin?.token ? <AdminDashboard/ >: <Navigate to='/admin/login'/>}/>
        <Route path='/users' element = {admin?.token  ? <Users/> : <Navigate to='/admin/login'/>}/>
        <Route path='/messages' element = {admin?.token  ? <Messages/> : <Navigate to='/admin/login'/>}/>
        <Route path='/trainers' element = {admin?.token  ? <Trainers/> : <Navigate to='/admin/login'/>}/>
        <Route path='/plans' element = {admin?.token  ? <Plans/> : <Navigate to='/admin/login'/>}/>
        <Route path='/addTrainer' element = {admin?.token  ? <AddTrainer/> : <Navigate to='/admin/login'/>}/>
        <Route path='/addPlan' element = {admin?.token  ? <AddPlan/> : <Navigate to='/admin/login'/>}/>
        <Route path='/updatePlan/:planId' element = {admin?.token  ? <UpdatePlan/> : <Navigate to='/admin/login'/>}/>
        <Route path='/assignTrainer' element = {admin?.token  ? <AssignTrainer/> : <Navigate to='/admin/login'/>}/>
        <Route path='/updateTrainer/:trainerId' element = {admin?.token  ? <UpdateTrainer/> : <Navigate to='/admin/login'/>}/>
        <Route path='/trainerDetails/:trainerId' element = {admin?.token  ? <TrainerDetails/> : <Navigate to='/admin/login'/>}/>
        <Route path='*' element ={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoute
import { Routes ,Route,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import TrainerDashboard from '../pages/trainer/mainPages/dashboard'
import Messages from '../pages/trainer/mainPages/messages'
import TaskScheduler from '../pages/trainer/mainPages/taskScheduler'
import TraineesData from '../pages/trainer/mainPages/traineesData'
import MyProfile from '../pages/trainer/mainPages/myProfile'
import BodyMetrics from '../pages/trainer/traineeData/bodyMetrics'
import FoodIntake from '../pages/trainer/traineeData/foodIntake'
import ScheduleTask from '../pages/trainer/taskScheduler/scheduleTask'
import NotFound from '../pages/errorPages/notFound'


function TrainerRoute() {
  const trainer = useSelector((state)=>state.Trainer)
  return (
    <div>
      <Routes>
        <Route path='/' element = {trainer?.token ? <TrainerDashboard/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/messages' element = {trainer?.token ? <Messages/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/taskScheduler' element = {trainer?.token ? <TaskScheduler/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/traineesData' element = {trainer?.token ? <TraineesData/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/myProfile' element = {trainer?.token ? <MyProfile/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/bodyMetrics/:traineeId' element = {trainer?.token ? <BodyMetrics/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/foodIntake/:traineeId' element = {trainer?.token ? <FoodIntake/>:<Navigate to='/trainer/login'/>}/>
        <Route path='/scheduleTask/:traineeId' element = {trainer?.token ? <ScheduleTask/>:<Navigate to='/trainer/login'/>}/>
        <Route path='*' element ={<NotFound/>}/> 
      </Routes>
    </div>
  )
}

export default TrainerRoute

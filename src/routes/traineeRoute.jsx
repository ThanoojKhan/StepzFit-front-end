import { Routes ,Route,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Messages from '../pages/users/messages'
import MyTasks from '../pages/users/myTasks'
import BodyMetrics from '../pages/users/bodyMetrics'
import AddBodyMetrics from '../components/traineeComponents/bodyMetrics/addBodyMetricsTab'
import MyProfile from '../pages/users/myProfile'
import FoodTracker from '../pages/users/foodTracker'
import EditBodyMetrics from '../components/traineeComponents/bodyMetrics/editBodyMetricsTab'

function TraineeRoute() {
  const user = useSelector((state)=>state.User)
  return (
    <div>
      <Routes>
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

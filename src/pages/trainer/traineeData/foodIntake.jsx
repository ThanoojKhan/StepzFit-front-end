import React from 'react'
import SideBar from '../../../components/trainerComponents/sideBar'
import FoodIntakeTab from '../../../components/trainerComponents/traineesData/foodIntakeTab'
import { useParams } from 'react-router-dom'
function FoodIntake() {

  const { traineeId } =useParams()
  return (
    <div className='flex'>
      <SideBar />
      <FoodIntakeTab traineeId={traineeId}/>
    </div>
  )
}

export default FoodIntake
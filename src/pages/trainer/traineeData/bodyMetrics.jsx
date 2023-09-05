import React from 'react'
import SideBar from '../../../components/trainerComponents/sideBar'
import BodyMetricsTab from '../../../components/trainerComponents/traineesData/bodyMetricsTab'
import { useParams } from 'react-router-dom'
function BodyMetrics() {

  const { traineeId } =useParams()

  return (
    <div className='flex'>
      <SideBar />
      <BodyMetricsTab traineeId={traineeId}/>
    </div>
  )
}

export default BodyMetrics
import React from 'react'
import PlansTab from '../../../components/adminComponents/plans/PlansTab'
import SideBar from '../../../components/adminComponents/sideBar'

function Plans() {
  return (
    <div className='flex'>
    <SideBar/>
    <PlansTab/>
    </div>
  )
}

export default Plans
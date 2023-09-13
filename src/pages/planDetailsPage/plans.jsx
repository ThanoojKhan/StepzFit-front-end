import React from 'react'
import NavBar from '../../components/landingPageComponents/organs/NavBar'
import Membership from '../../components/landingPageComponents/organs/Membership'
import StickyIcons from '../../components/landingPageComponents/molecules/StickyIcons'
import Footer from '../../components/landingPageComponents/organs/Footer'

function plans() {
  return (
    <>
      <NavBar></NavBar>
      <Membership></Membership>
      <StickyIcons></StickyIcons>
      <Footer/>
    </>
  )
}

export default plans

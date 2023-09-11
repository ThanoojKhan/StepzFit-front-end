import React from 'react'
import NavBar from '../../components/landingPageComponents/organs/NavBar'
import Membership from '../../components/landingPageComponents/organs/Membership'
import FooterLogo from '../../components/landingPageComponents/organs/FooterLogo'
import StickyIcons from '../../components/landingPageComponents/molecules/StickyIcons'

function plans() {
  return (
    <div>
        <NavBar></NavBar>
      <Membership></Membership>
      <StickyIcons></StickyIcons>
      <div className='bg-zinc-950'>
      <FooterLogo></FooterLogo>
      </div>
    </div>
  )
}

export default plans

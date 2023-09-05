import React, {useEffect} from 'react'
import LoginAdmin from '../../../components/adminComponents/adminLogin'

function AdminLogin() {
  useEffect(()=>{
    console.log('Signing in')
},[])

  return (
    <LoginAdmin/>
  )
}

export default AdminLogin
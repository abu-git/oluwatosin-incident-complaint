import UserDetailsForm from '@/components/UserDetailsForm'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col'>
        <h3 className="font-bold text-3xl mt-5 mb-3">Incident Complaint Form</h3>
        <h4 className="font-bold text-2xl mb-5">User Details</h4>
        <UserDetailsForm />
    </div>
    
  )
}

export default page
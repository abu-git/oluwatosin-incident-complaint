import IncidentClassificationForm from '@/components/IncidentClassificationForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
        <h3 className="font-bold text-3xl mt-5 mb-3">Incident Complaint Form</h3>
        <h4 className="font-bold text-2xl mb-5">Incident Classification</h4>

        <IncidentClassificationForm />

    </div>
  )
}

export default page
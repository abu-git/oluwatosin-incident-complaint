import IncidentEscalationForm from '@/components/IncidentEscalationForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col'>
        <h3 className="font-bold text-3xl mt-5 mb-3">Incident Complaint Form</h3>
        <h4 className="font-bold text-2xl mb-5">Incident Escalation and Closure</h4>

        <IncidentEscalationForm />
    </div>
  )
}

export default page
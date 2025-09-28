// components/IncidentLogStatusForm.jsx (or similar name)
'use client'

import { complaintSchema } from '@/features/complaint/schema'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useComplaintStore } from '@/app/complaint-form/store'


// Update the schema to include the new fields
const complaintIssueSchema = complaintSchema.pick({
    assignedTeam: true,
    diagnosisAction: true, // Assuming this matches the field in complaintSchema
    resolutionStatus: true
});

function IncidentLogStatusForm() {

    const name = useComplaintStore((state) => state.name)
    const employerId = useComplaintStore((state) => state.employerId)
    const department = useComplaintStore((state) => state.department)
    const incident = useComplaintStore((state) => state.incident)
    const classification = useComplaintStore((state) => state.classification)

    const router = useRouter()
    const setData = useComplaintStore((state) => state.setData)

    // Removed local state (resolutionStatusState) as it's not needed for onSubmit logic

    const form = useForm({
        resolver: zodResolver(complaintIssueSchema),
        defaultValues: {
            assignedTeam: '',
            diagnosisAction: '',
            resolutionStatus: ''
        }
    })

    const onSubmit = (data) => {
        // 1. Log and save data to store
        console.log(data)
        setData(data)
        
        // 2. Conditional Navigation Logic
        if (data.resolutionStatus === 'Resolved') {
            router.push('/') // Go to home page
        } else if (data.resolutionStatus === 'Escalate') {
            router.push('/complaint-form/incident-escalation-closure') // Go to escalation page
        }
        
        // If the status is neither 'Resolved' nor 'Escalate', nothing happens, 
        // which might indicate an incomplete selection.
    }

    useEffect(() => {
        if (!useComplaintStore.persist.hasHydrated()) return

        if(!name || !employerId || !department || !incident || !classification){
            router.push("/complaint-form/user-details")
        }
    }, [useComplaintStore.persist, name, employerId, department, incident, classification])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >

                {/* ASSIGNED TEAM (SELECT) */}
                <FormField
                    control={form.control}
                    name="assignedTeam"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assigned Team</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'>
                                        <SelectValue placeholder="Select Assigned Team" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Software Team">Software Team</SelectItem>
                                    <SelectItem value="Network Team">Network Team</SelectItem>
                                    <SelectItem value="Domain Team">Domain Team</SelectItem>
                                    <SelectItem value="Support Team">Support Team</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>This is the assigned team.</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* DIAGNOSIS ACTION (TEXTAREA) - NAME FIXED */}
                <FormField
                    control={form.control}
                    name="diagnosisAction" // <-- FIXED: Changed 'bio' to 'diagnosisAction'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diagnosis Action</FormLabel>
                            <FormControl>
                                <Textarea
                                    className='text-black bg-white'
                                    placeholder="Eg. Checked the server logs and identified connection timeout" 
                                    rows={4}
                                    {...field} 
                                />
                            </FormControl>
                            <FormDescription>This is the diagnosis action taken.</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* RESOLUTION STATUS (SELECT) */}
                <FormField
                    control={form.control}
                    name="resolutionStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resolution Status</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'>
                                        <SelectValue placeholder="Select Resolution Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Escalate">Escalate</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>This is the resolution status.</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit and Continue</Button>
            </form>
        </Form>
    )
}

export default IncidentLogStatusForm
// components/onboarding-role-form.jsx (or similar name)
'use client'

import { complaintSchema } from '@/features/complaint/schema'
import React, { useEffect } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select' // Import Select components
import { useComplaintStore } from '@/app/complaint-form/store'


// Update the schema to include the new field 'preferredRole'
const complaintIssueSchema = complaintSchema.pick({
    escalationLevel: true,
    escalationStatus: true,
    resolvedBy: true
});

function IncidentEscalationForm() { // Renamed for clarity

    const name = useComplaintStore((state) => state.name)
    const employerId = useComplaintStore((state) => state.employerId)
    const department = useComplaintStore((state) => state.department)
    const incident = useComplaintStore((state) => state.incident)
    const classification = useComplaintStore((state) => state.classification)
    const priority = useComplaintStore((state) => state.priority)
    const assignedTeam = useComplaintStore((state) => state.assignedTeam)
    const diagnosisAction = useComplaintStore((state) => state.diagnosisAction)
    const resolutionStatus = useComplaintStore((state) => state.resolutionStatus)

    const router = useRouter()
    const setData = useComplaintStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(complaintIssueSchema),
        defaultValues: {
            escalationLevel: '',
            escalationStatus: '',
            resolvedBy: ''
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
        router.push("/")
    }

    useEffect(() => {
        if (!useComplaintStore.persist.hasHydrated()) return

        if(!name || !employerId || !department || !incident || !classification || !priority || !assignedTeam || !diagnosisAction || !!resolutionStatus){
            router.push("/complaint-form/user-details")
        }
    }, [useComplaintStore.persist, name, employerId, department, incident, classification, priority, assignedTeam, diagnosisAction, resolutionStatus])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >

                {/* ESCALATION LEVEL */}
                <FormField
                    control={form.control}
                    name="escalationLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Escalation Level</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select Escalation Level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="Second Level Escalation">Second Level Escalation</SelectItem>
                                    <SelectItem value="Third Level Escalation">Third Level Escalation</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident escalation level
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                {/* ESCALATION STATUS */}
                <FormField
                    control={form.control}
                    name="escalationStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Escalation Status</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select Escalation Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Waiting Approval">Waiting Approval</SelectItem>
                                    <SelectItem value="Order System">Order System</SelectItem>
                                    <SelectItem value="Order Software">Order Software</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident escalation status
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                {/* RESOLVED BY */}
                <FormField
                    control={form.control}
                    name="resolvedBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Resolved By</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select Resolution Team" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="resolved@amouser">resolved@amouser</SelectItem>
                                    <SelectItem value="resolved@dcdatauser">resolved@dcdatauser</SelectItem>
                                    <SelectItem value="resolved@i.techsolutionuser">resolved@i.techsolutionuser</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident escalation status
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}

export default IncidentEscalationForm
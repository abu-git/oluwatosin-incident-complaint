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
    classification: true,
    priority: true,
});

function IncidentClassificationForm() { // Renamed for clarity

    const name = useComplaintStore((state) => state.name)
    const employerId = useComplaintStore((state) => state.employerId)
    const department = useComplaintStore((state) => state.department)
    const incident = useComplaintStore((state) => state.incident)

    const router = useRouter()
    const setData = useComplaintStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(complaintIssueSchema),
        defaultValues: {
            classification: '',
            priority: ''
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
        router.push("/complaint-form/incident-log-status")
    }

    useEffect(() => {
        if (!useComplaintStore.persist.hasHydrated()) return

        if(!name || !employerId || !department || !incident){
            router.push("/complaint-form/user-details")
        }
    }, [useComplaintStore.persist, name, employerId, department, incident, router])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >

                {/* CLASSIFICATION */}
                <FormField
                    control={form.control}
                    name="classification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Classification</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select Classification" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="Software application">Software application</SelectItem>
                                    <SelectItem value="Networking">Networking</SelectItem>
                                    <SelectItem value="Domain Issues">Domain Issues</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident classification
                            </FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* PRIORITY */}
                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Priority</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className='text-black bg-white'> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident priority
                            </FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}

export default IncidentClassificationForm
// components/onboarding-role-form.jsx (or similar name)
'use client'

import { complaintSchema } from '@/features/complaint/schema'
import React from 'react'
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
    name: true,
    employerId: true,
    department: true,
    incident: true
});

function UserDetailsForm() { // Renamed for clarity

    const router = useRouter()
    const setData = useComplaintStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(complaintIssueSchema),
        defaultValues: {
            name: '',
            employerId: '',
            department: '',
            incident: '',
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
        router.push("/complaint-form/incident-classification")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >
                {/* NAME  */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input className='text-black bg-white' placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>Your name.</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* Employer ID */}
                <FormField
                    control={form.control}
                    name="employerId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Employer ID</FormLabel>
                            <FormControl>
                                <Input className='text-black bg-white' placeholder="574932" {...field} />
                            </FormControl>
                            <FormDescription>Your Employer ID</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* DEPARTMENT */}
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <Input className='text-black bg-white' placeholder="admin" {...field} />
                            </FormControl>
                            <FormDescription>Your Department</FormDescription>
                            <FormMessage className='text-red-500' />
                        </FormItem>
                    )}
                />

                {/* NEW DROPDOWN MENU (SELECT) FIELD */}
                <FormField
                    control={form.control}
                    name="incident"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Incident Issue</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="text-black bg-white"> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select your issue" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="Application software crashes">Application software crashes</SelectItem>
                                    <SelectItem value="Unable to connect to server">Unable to connect to server</SelectItem>
                                    <SelectItem value="Desktop application issue">Desktop application issue</SelectItem>
                                    <SelectItem value="Active directory issue">Active directory issue</SelectItem>
                                    <SelectItem value="Rejoin domain/workgroup">Rejoin domain/workgroup</SelectItem>
                                    <SelectItem value="Unable to print">Unable to print</SelectItem>
                                    <SelectItem value="Paper jam">Paper jam</SelectItem>
                                    <SelectItem value="Out of toner">Out of toner</SelectItem>
                                    <SelectItem value="Windows operating system requires reinstall">Windows operating system requires reinstall</SelectItem>
                                    <SelectItem value="Operating system crashes">Operating system crashes</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the incident issue
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

export default UserDetailsForm
// components/onboarding-role-form.jsx (or similar name)
'use client'

import { onboardingSchema } from '@/features/onboarding/schema'
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
import { useOnboardingStore } from '@/app/onboarding/store'


// Update the schema to include the new field 'preferredRole'
const onboardingRoleSchema = onboardingSchema.pick({
    firstName: true,
    lastName: true,
    // Assuming 'preferredRole' is now part of the schema you import
    preferredRole: true 
});

function OnboardingRoleForm() { // Renamed for clarity

    const router = useRouter()
    const setData = useOnboardingStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(onboardingRoleSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            preferredRole: '' // Add default value for the new field
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
        router.push("/onboarding/password")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >
                {/* FIRST NAME FIELD (UNCHANGED) */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input className='text-white' placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>This is your first name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* LAST NAME FIELD (UNCHANGED) */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input className='text-white' placeholder="Doe" {...field} />
                            </FormControl>
                            <FormDescription>This is your last name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* NEW DROPDOWN MENU (SELECT) FIELD */}
                <FormField
                    control={form.control}
                    name="preferredRole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred Role</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="text-white"> {/* Use the SelectTrigger component */}
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent> {/* Use the SelectContent component */}
                                    <SelectItem value="ENGINEER">Software Engineer</SelectItem>
                                    <SelectItem value="DESIGNER">UX/UI Designer</SelectItem>
                                    <SelectItem value="PRODUCT_MANAGER">Product Manager</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the role you're applying for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}

export default OnboardingRoleForm
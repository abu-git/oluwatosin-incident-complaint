'use client'

import { onboardingSchema } from '@/features/onboarding/schema'
import React from 'react'
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useOnboardingStore } from '@/app/onboarding/store'


const onboardingNameSchema = onboardingSchema.pick({
    firstName: true,
    lastName: true
});

function OnboardingNameForm() {

    const router = useRouter()

    const setData = useOnboardingStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(onboardingNameSchema),
        defaultValues: {
            firstName: '',
            lastName: ''
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
                <Button type="submit">Next</Button>
            </form>
        </Form>
    )
}

export default OnboardingNameForm
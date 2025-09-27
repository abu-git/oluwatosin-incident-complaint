'use client'

import { useRouter } from 'next/navigation'
import { onboardingSchema } from '@/features/onboarding/schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { useOnboardingStore } from '@/app/onboarding/store'


const onboardingUsernameSchema = onboardingSchema.pick({
    username: true,
    terms: true
})



export default function OnboardingUsernameForm(){

    const firstName = useOnboardingStore((state) => state.firstName)
    const lastName = useOnboardingStore((state) => state.lastName)
    const password = useOnboardingStore((state) => state.password)
    const repeatPassword = useOnboardingStore((state) => state.repeatPassword)
    const preferredRole = useOnboardingStore((state) => state.preferredRole)
    

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(onboardingUsernameSchema),
        defaultValues: {
            username: "",
            terms: false
        }
    })

    const onSubmit = (data) => {
        console.log({
            ...data,
            firstName,
            lastName,
            password,
            repeatPassword,
            preferredRole
        })
    }


    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input className="text-white" placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>This is your username.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>I agree to the terms of service.</FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Next</Button>
            </form>
        </Form>
    )

}
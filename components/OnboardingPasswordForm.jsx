'use client'

import { useRouter } from 'next/navigation'
import { onboardingSchema } from '@/features/onboarding/schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useOnboardingStore } from '@/app/onboarding/store'
import { useEffect } from 'react'


const onboardingPasswordSchema = onboardingSchema.pick({
    password: true,
    repeatPassword: true
})

export default function OnboardingPasswordForm(){

    const firstName = useOnboardingStore((state) => state.firstName)
    const lastName = useOnboardingStore((state) => state.lastName)
    const preferredRole = useOnboardingStore((state) => state.preferredRole)

    const router = useRouter()

    const setData = useOnboardingStore((state) => state.setData)

    const form = useForm({
        resolver: zodResolver(onboardingPasswordSchema),
        defaultValues: {
            password: "",
            repeatPassword: ""
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        setData(data)
        router.push("/onboarding/username")
    }

    useEffect(() => {
        if (!useOnboardingStore.persist.hasHydrated()) return

        if (!firstName || !lastName || !preferredRole) {
            router.push("/onboarding/name");
        }
    }, [ useOnboardingStore.persist, firstName, lastName, preferredRole, router ])

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[300px] space-y-8"
            >
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input className="text-white" placeholder="********" type="password" {...field} />
                        </FormControl>
                        <FormDescription>This is your password.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input className="text-white" placeholder="********" type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your password confirmation.
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
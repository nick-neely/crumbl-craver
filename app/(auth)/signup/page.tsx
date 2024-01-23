'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import signUp from '../../actions/signUp'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Loader2, Mail } from 'lucide-react'
import { formatPhoneNumber } from '@/lib/utils'

// Interface for form values
interface SignupFormValues {
  email: string
  password: string
  displayName: string
  phone: string
}

interface SignupProps {
  searchParams: { message?: string }
}

// Zod schema for form validation
const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  displayName: z
    .string()
    .min(1, { message: 'Display name is required' })
    .max(20, { message: 'Display name must be less than 20 characters' }),
  phone: z
    .string()
    .min(12, { message: 'Phone number must be at least 10 digits' }),
})

export default function Signup({ searchParams }: SignupProps) {
  const [signUpError, setSignUpError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  // Extract the message from searchParams
  const message = searchParams.message

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true)
    try {
      await signUp(data)
    } catch (error) {
      console.error('Sign-up error:', error)
      setSignUpError('Sign-up failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="flex flex-col items-center justify-center py-2">
        {message && (
          <div
            className="flex items-center rounded-md border-t-4 border-blue-500 bg-blue-100 p-4 dark:bg-blue-200"
            role="alert"
          >
            <div className="flext items-center">
              <Mail className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                {decodeURIComponent(message)}
              </p>
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        onChange={(e) => {
                          const formattedValue = formatPhoneNumber(
                            e.target.value
                          )
                          form.setValue('phone', formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {signUpError && <p className="text-red-500">{signUpError}</p>}
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mb-2 rounded-md bg-green-700 px-4 py-2 text-white hover:bg-green-600"
                >
                  Sign Up
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Link
            href="/login"
            className="text-center text-sm text-foreground/60"
          >
            Already have an account? Login
          </Link>
          <Link href="/" className="text-center text-sm text-foreground/60">
            Go Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

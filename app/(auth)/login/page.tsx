'use client'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import signIn from '../../_actions/signIn'
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
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, ShieldAlert } from 'lucide-react'

// Interface for form values
interface LoginFormValues {
  email: string
  password: string
}

interface SignupProps {
  searchParams: { message?: string }
}

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export default function Login({ searchParams }: SignupProps) {
  const [signInError, setSignInError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // Extract the message from searchParams
  const message = searchParams.message

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true)
    try {
      await signIn(data)
    } catch (error) {
      setSignInError('Sign-in failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="flex w-96 flex-col items-center justify-center py-2 dark:border-slate-600 dark:bg-slate-800">
        {message && (
          <div
            className="flex items-center rounded-md border-t-4 border-red-500 bg-red-100 p-4 dark:bg-red-200"
            role="alert"
          >
            <div className="flext items-center">
              <ShieldAlert
                className="h-6 w-6 text-red-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {decodeURIComponent(message)}
              </p>
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
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
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              {signInError && <p className="text-red-500">{signInError}</p>}
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
                  Log In
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Link
            href="/signup"
            className="text-center text-sm text-foreground/60"
          >
            Don't have an account? Sign up
          </Link>

          <Link href="/" className="text-center text-sm text-foreground/60">
            Go Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

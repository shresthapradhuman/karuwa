'use client'
import { loginSchema } from '@/schema'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { login } from '../actions/login'
import { toast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import OAuthLinkNotLinked from './OAuthLinkNotLinked'

type FormData = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackurl = searchParams.get('callbackUrl')
  useEffect(() => {
    if (searchParams.get('error') === 'OAuthAccountNotLinked') {
      toast({
        variant: 'destructive',
        description: 'Email already in use with different auth provider.'
      })
    }
  }, [searchParams])
  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = (data: FormData) => {
    startTransition(() => {
      login(data, callbackurl!)
        .then(response => {
          if (response?.error) {
            toast({
              variant: 'destructive',
              description: response.error
            })
          }
          if (response?.success) {
            toast({
              description: response.success,
              variant: 'success'
            })
            if (!response.isVerified) {
              router.push('/auth/verification')
            }
          }
        })
        .catch(error => {
          toast({
            variant: 'destructive',
            description: 'Something went wrong'
          })
        })
    })
  }
  return (
    <>
      <OAuthLinkNotLinked errorMessage={searchParams.get('error') || ''} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor={field.name}
                    className='text-base capitalize text-inherit'
                  >
                    {field.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='eg: john@example.com'
                      id={field.name}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center justify-between'>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-base capitalize text-inherit'
                    >
                      {field.name}
                    </FormLabel>
                    <Link
                      href={'/auth/forgot-password'}
                      className='text-sm font-normal text-blue-800 hover:underline'
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      placeholder='******'
                      id={field.name}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className='w-full text-base' disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default LoginForm

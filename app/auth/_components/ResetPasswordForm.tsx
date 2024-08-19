'use client'
import { passwordResetSchema } from '@/schema'
import React, { useTransition } from 'react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { resetPassword } from '../actions/reset-password'

type FormData = z.infer<typeof passwordResetSchema>

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const form = useForm<FormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  const onSubmit = (data: FormData) => {
    startTransition(() => {
      resetPassword(data, token).then(response => {
        if (response.error) {
          toast({
            variant: 'destructive',
            description: response.error
          })
        }
        if (response.success) {
          toast({
            description: response.success,
            className: 'bg-green-500 text-white'
          })
          router.push('/auth/login')
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-8'>
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='password'
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
                    type='password'
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
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className='text-base capitalize text-inherit'
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
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
        </div>
        <Button className='w-full text-base' disabled={isPending}>
          {isPending ? 'Updating...' : 'Confirm Password'}
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm

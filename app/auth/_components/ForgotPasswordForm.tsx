'use client'
import { passwordForgotSchema } from '@/schema'
import React from 'react'
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
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { forgotPassword } from '../actions/fogot-password'

type FormData = z.infer<typeof passwordForgotSchema>

const ForgotPasswordForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<FormData>({
    resolver: zodResolver(passwordForgotSchema),
    defaultValues: {
      email: ''
    }
  })
  const onSubmit = (data: FormData) => {
    startTransition(() => {
      forgotPassword(data).then(response => {
        if (response.error) {
          toast({
            description: response.error,
            variant: 'destructive'
          })
        }
        if (response.success) {
          toast({
            description: response.success,
            variant: 'success'
          })
          form.reset()
          router.push('/auth/login')
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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
        <Button className='w-full text-base' disabled={isPending}>
          {isPending ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm

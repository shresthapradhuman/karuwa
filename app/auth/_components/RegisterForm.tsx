'use client'
import { registerSchema } from '@/schema'
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
import { register } from '../actions/register'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })
  const onSubmit = (data: FormData) => {
    startTransition(() => {
      register(data).then(response => {
        if (response?.error) {
          toast({
            description: response.error,
            variant: 'destructive'
          })
          return
        }
        if (response?.success) {
          toast({
            description: response.success,
            variant: 'success'
          })
          form.reset()
          router.push('/auth/verification')
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <div className='grid gap-2'>
          <FormField
            control={form.control}
            name='name'
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
                    placeholder='eg: John Doe'
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
          {isPending ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm

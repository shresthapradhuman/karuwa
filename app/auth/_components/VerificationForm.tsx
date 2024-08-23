'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { verification } from '../actions/verification'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  token: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.'
  })
})

const VerificationForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: ''
    }
  })
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startTransition(() => {
      verification(data.token).then(response => {
        if (response.success) {
          toast({
            description: response.success,
            variant: 'success'
          })
          router.push('/auth/login')
        }
        if (response.error) {
          toast({
            variant: 'destructive',
            description: response.error
          })
          form.reset()
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='token'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>
          {isPending ? 'Verifying...' : 'Verfiy Email'}
        </Button>
      </form>
    </Form>
  )
}

export default VerificationForm

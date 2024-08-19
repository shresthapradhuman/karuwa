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
import { Input } from '@/components/ui/input'
import { userSettingsSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '@/components/ui/use-toast'
import { settings } from '../actions/settings'
import { useTransition } from 'react'

type FormData = z.infer<typeof userSettingsSchema>

const UserSettings = () => {
  const session = useSession()
  const user = session.data?.user
  const update = session.update
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      newPassword: ''
    }
  })
  const onSubmit = (values: FormData) => {
    startTransition(() => {
      settings(values)
        .then(data => {
          if (data?.error)
            toast({
              description: data?.error,
              variant: 'destructive'
            })
          if (data?.success) {
            update()
            toast({
              description: data?.success,
              variant: 'success'
            })
          }
        })
        .catch(() =>
          toast({
            description: 'Something went wrong',
            variant: 'destructive'
          })
        )
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid gap-4'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={field.name}
                  className='text-base text-inherit'
                >
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder='Enter your name'
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    {...field}
                    placeholder='johndoe@example.com'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!user?.isOAuth && (
            <>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        {...field}
                        placeholder='*******'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        {...field}
                        placeholder='*******'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <Button>{isPending ? 'Saving...' : 'Save Changes'}</Button>
      </form>
    </Form>
  )
}

export default UserSettings

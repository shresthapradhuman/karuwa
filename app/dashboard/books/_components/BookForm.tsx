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
import { Textarea } from '@/components/ui/textarea'
import { bookSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ImageUploaderLabel from './ImageUploaderLabel'
import { toast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { createBook, updateBook } from '../actions'

type FormData = z.infer<typeof bookSchema>

const BookForm = ({ initialData }: { initialData?: Book }) => {
  const [image, setImage] = React.useState<string | null>(
    initialData?.imageUrl || null
  )
  const [isPending, startTransition] = React.useTransition()
  const form = useForm<FormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || '',
      totalPages: initialData?.totalPages?.toString() || '',
      status: initialData?.status || 'NOT_READ',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || ''
    }
  })
  const onSubmit = (data: FormData) => {
    startTransition(() => {
      if (initialData) {
        // update book
        updateBook(data, initialData.id).then(response => {
          if (response?.error) {
            toast({
              variant: 'destructive',
              description: response.error
            })
            return
          }
          toast({
            description: 'Book updated successfully',
            className: 'bg-green-500 text-white'
          })
        })
      } else {
        // create book
        createBook(data).then(response => {
          if (response?.error) {
            toast({
              variant: 'destructive',
              description: response.error
            })
            return
          }
          toast({
            description: 'Book added successfully',
            className: 'bg-green-500 text-white'
          })
        })
      }
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-10 pt-5 md:grid-cols-12'>
          <div className='order-2 grid gap-5 md:order-1 md:col-span-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor={field.name}
                    className='text-base font-medium capitalize text-inherit'
                  >
                    {field.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      {...field}
                      placeholder='eg: Atomic Habits'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid md:grid-cols-2 md:gap-5'>
              <FormField
                control={form.control}
                name='author'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-base font-medium capitalize text-inherit'
                    >
                      {field.name}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={field.name}
                        {...field}
                        placeholder='eg: James Clear'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='genre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-base font-medium capitalize text-inherit'
                    >
                      {field.name}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={field.name}
                        {...field}
                        placeholder='eg: Self-help'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-5'>
              <FormField
                control={form.control}
                name='totalPages'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-base text-inherit'
                    >
                      Total Pages
                    </FormLabel>
                    <FormControl>
                      <Input
                        id={field.name}
                        className='flex-1'
                        {...field}
                        placeholder='eg: 256'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor={field.name}
                      className='text-base text-inherit'
                    >
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='NOT_READ'>Not Read</SelectItem>
                        <SelectItem value='READING'>Reading</SelectItem>
                        <SelectItem value='FINISHED'>Finished</SelectItem>
                        <SelectItem value='WANT_TO_READ'>
                          Want to Read
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor={field.name}
                    className='text-base font-medium capitalize text-inherit'
                  >
                    Book Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id={field.name}
                      rows={10}
                      disabled={isPending}
                      className='resize-none'
                      placeholder='eg: Atomic Habits is pretty fundamentally a “self help book.” This is a pretty controversial genre in my experience. '
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' size={'lg'}>
              {isPending
                ? 'loading...'
                : initialData
                  ? 'Update Book'
                  : 'Create Book'}{' '}
            </Button>
          </div>
          <div className='md:order-2 md:col-span-4'>
            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <ImageUploaderLabel image={image} />
                  <FormControl>
                    <Input
                      id='image'
                      type='file'
                      className='hidden'
                      disabled={isPending}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          let reader = new FileReader()
                          reader.onload = e => {
                            field.onChange(e.target?.result)
                            setImage(e.target?.result as string)
                          }
                          reader.readAsDataURL(e.target.files[0])
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default BookForm

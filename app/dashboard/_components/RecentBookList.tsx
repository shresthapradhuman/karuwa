'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Book } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { updateReadingProgress } from '../actions/updateReadingProgress'
import { toast } from '@/components/ui/use-toast'

const RecentBookList = ({ books }: { books: Book[] }) => {
  const [isPending, startTransition] = React.useTransition()
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  return (
    <div className='max-w-xl space-y-8 rounded-md border p-4 shadow-md'>
      <div>
        <h1 className='text-2xl font-bold'>Recent Reading</h1>
        <p>Update progress by clicking edit</p>
      </div>
      <ul className='space-y-4'>
        {books.map(book => (
          <li
            key={book.id}
            className='flex items-center gap-8 rounded-md border-t p-4 shadow'
          >
            <Image
              src={book?.imageUrl || '/no-image.png'}
              width={100}
              height={150}
              alt={book.title}
              className='h-auto w-[60px] object-cover'
            />
            <div className='flex-1'>
              <h2 className='text-lg font-semibold'>{book.title}</h2>
              <p className='font-medium'>{book.author}</p>
              <div className='grid flex-1 gap-2'>
                <Progress
                  className='mt-2 h-2'
                  value={
                    book.currentPage !== null && book.totalPages !== null
                      ? getProgress(book.currentPage, book.totalPages)
                      : 0
                  }
                  max={100}
                />
                <div className='flex items-center justify-between gap-4'>
                  <p>
                    {book.currentPage !== null && book.totalPages !== null
                      ? `${book.currentPage} / ${book.totalPages} pages`
                      : 'No progress'}
                  </p>
                  <Dialog>
                    <DialogTrigger>
                      <p className='cursor-pointer text-blue-500'>Edit</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Reading Progress</DialogTitle>
                        <DialogDescription>
                          Insert book page number you are currently reading
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          const formData = new FormData(
                            e.target as HTMLFormElement
                          )
                          const pageNumber = formData.get(
                            'pageNumber'
                          ) as string
                          startTransition(() => {
                            updateReadingProgress(
                              book.id,
                              parseInt(pageNumber)
                            ).then(response => {
                              if (response?.error) {
                                toast({
                                  variant: 'destructive',
                                  description: response.error
                                })
                                return
                              }
                              toast({
                                variant: 'success',
                                description:
                                  'Updated reading progress successfully'
                              })
                            })
                          })
                        }}
                      >
                        <Input
                          name='pageNumber'
                          placeholder='Enter page number. eg: 20'
                        />
                        <DialogClose>
                          <Button className='mt-4'>Update</Button>
                        </DialogClose>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function getProgress(currentPage: number, totalPages: number) {
  if (currentPage !== null && totalPages !== null) {
    return (currentPage / totalPages) * 100
  }
  return 0
}

export default RecentBookList

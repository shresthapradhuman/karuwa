'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from '@prisma/client'

export default function BookWantToReadList({ books }: { books: Book[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <p>Your Book&apos;s Wish List</p>
          <span className='rounded-md border border-primary p-1 text-sm'>
            {books.length} Books Available
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='mt-4 grid gap-8'>
        {books.map(book => (
          <div
            className='flex items-center justify-between gap-4'
            key={book.id}
          >
            <div className='flex items-start gap-4'>
              <Avatar className='hidden h-9 w-9 border border-primary shadow-md sm:flex'>
                <AvatarImage
                  src={book.imageUrl || '/no-image.png'}
                  alt={book.title}
                />
                <AvatarFallback>{book.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>{book.title}</p>
                <p className='text-sm text-muted-foreground'>{book.author}</p>
              </div>
            </div>
            <div>{book.totalPages} pages</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

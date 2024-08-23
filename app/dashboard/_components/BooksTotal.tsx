'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

export default function BooksTotal({ totalBooks }: { totalBooks: number }) {
  return (
    <Card className='sm:col-span-2'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle>Total Books</CardTitle>
            <CardDescription className='max-w-lg text-balance leading-relaxed'>
              Number of books you have read in your book list.
            </CardDescription>
          </div>
          <div className='text-4xl font-bold'>{totalBooks}</div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={'/dashboard/books/new'}>Add New Book</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

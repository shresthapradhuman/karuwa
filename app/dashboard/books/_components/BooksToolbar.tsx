'use client'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import BookKeywordFilter from './BookKeywordFilter'
import BookStatusFilter from './BookStatusFilter'

const BooksToolbar = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex space-x-2'>
        <BookKeywordFilter />
        <BookStatusFilter />
      </div>
      <Button asChild className='h-8'>
        <Link href='/dashboard/books/new'>
          <PlusCircleIcon className='mr-2 inline-flex h-4 w-4 items-center' />
          New Book
        </Link>
      </Button>
    </div>
  )
}

export default BooksToolbar

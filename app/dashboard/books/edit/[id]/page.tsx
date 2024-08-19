import React, { cache } from 'react'
import dynamic from 'next/dynamic'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

const BookForm = dynamic(() => import('../../_components/BookForm'), {
  ssr: false
})

interface BookEditProps {
  params: {
    id: string
  }
}

const fetchBook = cache((id: string) =>
  prisma.book.findUnique({
    where: {
      id
    }
  })
)

const BookEditPage = async ({ params }: BookEditProps) => {
  const book = await fetchBook(params.id)
  if (!book) notFound()
  return (
    <div className='p-4'>
      <BookForm initialData={book} />
    </div>
  )
}

export default BookEditPage

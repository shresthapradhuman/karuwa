import prisma from '@/prisma/client'
import React from 'react'
import BooksTable, { BookQuery, columnNames } from './_components/BooksTable'
import { Metadata } from 'next'
import { STATUS } from '@prisma/client'
import BooksPagination from './_components/BooksPagination'
import { auth } from '@/auth'
import BooksToolbar from './_components/BooksToolbar'

interface SearchParamsProps {
  searchParams: BookQuery
}

const BookListPage = async ({ searchParams }: SearchParamsProps) => {
  const session = await auth()
  const statuses = Object.values(STATUS)
  const status = statuses.includes(searchParams?.status)
    ? searchParams.status
    : undefined
  const orderBy = columnNames.includes(searchParams.sortBy)
    ? { [searchParams.sortBy]: searchParams.sortOrder }
    : undefined
  const page = parseInt(searchParams.page) || 1
  const pageSize = 7
  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: searchParams.keyword,
        mode: 'insensitive'
      },
      status,
      userId: session?.user.id
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })
  const booksCount = await prisma.book.count({
    where: {
      userId: session?.user.id,
      status
    }
  })
  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <BooksToolbar />
      <BooksTable data={books!} searchParams={searchParams} />
      <BooksPagination
        itemCount={booksCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Karuwa - Book List',
  description: 'View all books in your library'
}

export default BookListPage

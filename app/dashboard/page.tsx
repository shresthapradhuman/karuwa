import React from 'react'
import RecentBookList from './_components/RecentBookList'
import prisma from '@/prisma/client'

const DashboardPage = async () => {
  const recentBooks = await prisma.book.findMany({
    where: {
      status: 'READING'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return (
    <div className='p-4'>
      <RecentBookList books={recentBooks} />
    </div>
  )
}

export default DashboardPage

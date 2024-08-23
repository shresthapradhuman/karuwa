import React from 'react'
import RecentBookList from './_components/RecentBookList'
import prisma from '@/prisma/client'
import BookStatus from './_components/BookStatus'
import BookNotFinished from './_components/BookNotFinished'
import BooksTotal from './_components/BooksTotal'

const DashboardPage = async () => {
  const recentBooks = await prisma.book.findMany({
    where: {
      status: 'READING'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const weekData = await getBookCompletedByWeek()
  const monthData = await getBookCompletedByMonth()
  const notFinishedData = await getNotCompletedBooks()
  const totalBooks = await prisma.book.count()
  return (
    <div className='p-4'>
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='col-span-2 space-y-4'>
          <BooksTotal totalBooks={totalBooks} />
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <BookStatus
              title={'week'}
              value={weekData.finishedThisWeek}
              progress={weekData.percentage}
            />
            <BookStatus
              title={'month'}
              value={monthData.finishedThisMonth}
              progress={monthData.percentage}
            />
            <BookNotFinished
              percentage={notFinishedData.percentage}
              numberOfBooks={notFinishedData.notCompletedBooks}
            />
          </div>
        </div>
        <div className='grid gap-4'>
          <RecentBookList books={recentBooks} />
        </div>
      </div>
    </div>
  )
}

async function getBookCompletedByWeek() {
  const today = new Date()
  const lastWeekStart = new Date()
  lastWeekStart.setDate(today.getDate() - today.getDay() - 6)
  const lastWeekEnd = new Date(lastWeekStart)
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6)

  // Determine this week's date range (Monday to today)
  const thisWeekStart = new Date(lastWeekEnd)
  thisWeekStart.setDate(lastWeekEnd.getDate() + 1)
  const thisWeekEnd = today // Up to today
  const finishedThisWeek = await prisma.book.count({
    where: {
      status: 'FINISHED',
      updatedAt: {
        gte: thisWeekStart,
        lte: thisWeekEnd
      }
    }
  })
  const finishedLastWeek = await prisma.book.count({
    where: {
      status: 'FINISHED',
      updatedAt: {
        gte: lastWeekStart,
        lte: lastWeekEnd
      }
    }
  })
  const percentage =
    ((finishedThisWeek - finishedLastWeek) / finishedLastWeek) * 100
  return {
    finishedThisWeek,
    percentage
  }
}

async function getBookCompletedByMonth() {
  const today = new Date()
  // Calculate the start of the current month
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  // Calculate the start of next month to find the end of the current month
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const thisMonthEnd = today // Up to today

  // Calculate the start and end of last month
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
  // Count books finished last month
  const finishedLastMonth = await prisma.book.count({
    where: {
      status: 'FINISHED',
      updatedAt: {
        gte: lastMonthStart,
        lte: lastMonthEnd
      }
    }
  })

  // Count books finished this month
  const finishedThisMonth = await prisma.book.count({
    where: {
      status: 'FINISHED',
      updatedAt: {
        gte: thisMonthStart,
        lte: thisMonthEnd
      }
    }
  })
  const percentage =
    ((finishedThisMonth - finishedLastMonth) / finishedLastMonth) * 100
  return {
    finishedThisMonth,
    percentage
  }
}

async function getNotCompletedBooks() {
  const notCompletedBooks = await prisma.book.count({
    where: {
      status: 'NOT_READ',
      currentPage: {
        equals: 0
      }
    }
  })
  const totalBooks = await prisma.book.count()
  const percentage = (notCompletedBooks / totalBooks) * 100
  return {
    notCompletedBooks,
    percentage
  }
}

export default DashboardPage

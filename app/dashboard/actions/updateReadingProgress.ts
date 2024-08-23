'use server'

import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateReadingProgress(
  bookId: string,
  currentPage: number
) {
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: bookId
      }
    })
    if (!book) {
      return { error: 'Book not found' }
    }
    if (currentPage < (book?.currentPage ?? 0)) {
      return { error: 'Invalid page number' }
    }
    await prisma.book.update({
      where: {
        id: bookId
      },
      data: {
        currentPage,
        ...(currentPage == book.totalPages && { status: 'FINISHED' })
      }
    })
  } catch (error) {
    console.error('Update Reading Progress', error)
    return { error: 'Something went wrong' }
  }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

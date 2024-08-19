'use server'

import { auth } from '@/auth'
import { deleteImage, uploadImage } from '@/lib/upload'
import prisma from '@/prisma/client'
import { bookSchema } from '@/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { z } from 'zod'

export async function createBook(values: z.infer<typeof bookSchema>) {
  try {
    const session = await auth()
    const validatedFields = bookSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: validatedFields.error.errors[0].message }
    }
    const { title, author, genre, totalPages, description, status, imageUrl } =
      validatedFields.data
    /** check the book exist or not */
    const book = await prisma.book.findFirst({
      where: {
        title: title,
        userId: session?.user.id
      }
    })
    if (book) {
      return { error: 'Book already exist' }
    }
    /** upload image to cloudinary  */
    const image = await uploadImage(imageUrl, session?.user.id || 'books')

    /** create book */
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        totalPages: parseInt(totalPages),
        description,
        status,
        imageUrl: image.url,
        user: {
          connect: {
            id: session?.user.id
          }
        }
      }
    })
    if (!newBook) {
      return { error: 'Something went wrong' }
    }
  } catch (error) {
    console.error('Create Book', error)
    return { error: 'Something went wrong' }
  }
  revalidatePath('/dashboard/books')
  redirect('/dashboard/books')
}

export async function updateBook(
  values: z.infer<typeof bookSchema>,
  id: string
) {
  try {
    const session = await auth()
    const validatedFields = bookSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: validatedFields.error.errors[0].message }
    }
    const { title, author, genre, totalPages, status, description, imageUrl } =
      validatedFields.data
    /** check the book exist or not */
    const book = await prisma.book.findFirst({
      where: {
        id: id
      }
    })
    if (!book) {
      return { error: 'Book not found' }
    }

    /** check image is uploaded or not */
    let image = imageUrl
    if (!imageUrl.startsWith('https://res.cloudinary.com/')) {
      /** remove old image */
      if (book.imageUrl) {
        await deleteImage(book.imageUrl, session?.user.id || 'books')
      }
      /** upload image to cloudinary  */
      const { url } = await uploadImage(imageUrl, session?.user.id || 'books')
      image = url
    }

    /** create book */
    const updateBook = await prisma.book.update({
      where: {
        id: book.id
      },
      data: {
        title,
        author,
        genre,
        totalPages: parseInt(totalPages),
        status,
        description,
        imageUrl: image
      }
    })
    if (!updateBook) {
      return { error: 'Something went wrong' }
    }
  } catch (error) {
    console.error('Update Book', error)
    return { error: 'Something went wrong' }
  }
  revalidatePath('/dashboard/books')
  redirect('/dashboard/books')
}

export async function deleteBook(id: string) {
  try {
    const session = await auth()
    /** check the book exist or not */
    const book = await prisma.book.findFirst({
      where: {
        id: id
      }
    })
    if (!book) {
      return { error: 'Book not found' }
    }

    /** remove cloudinary image */
    if (book.imageUrl) {
      await deleteImage(book.imageUrl, session?.user.id || 'books')
    }

    /** create book */
    const deleteBook = await prisma.book.delete({
      where: {
        id: book.id
      }
    })

    if (!deleteBook) {
      return { error: 'Something went wrong' }
    }
  } catch (error) {
    console.error('Delete Book', error)
    return { error: 'Something went wrong' }
  }
  revalidatePath('/dashboard/books')
}

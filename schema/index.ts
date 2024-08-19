import * as z from 'zod'

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .refine(data => data.length >= 6, {
      message: 'Password must be at least 6 characters.'
    }),
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(255, {
      message: 'Name must be less than 255 characters.'
    })
    .refine(data => data.length >= 3, {
      message: 'Name must be at least 3 characters.'
    })
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .refine(data => data.length >= 6, {
      message: 'Password must be at least 6 characters.'
    })
})

export const passwordForgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Invalid email.' })
})

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Password is required.' })
      .refine(data => data.length >= 6, {
        message: 'Password must be at least 6 characters.'
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required.' })
      .refine(data => data.length >= 6, {
        message: 'Confirm password must be at least 6 characters.'
      })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.'
  })

export const userSettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string()),
  newPassword: z.optional(z.string())
})

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Book title is required' })
    .max(255, { message: 'Book title is too long' })
    .refine(title => title.length > 3, {
      message: 'Book title is too short'
    }),
  author: z
    .string()
    .min(1, { message: 'Author is required' })
    .max(255, { message: 'Author is too long' })
    .refine(author => author.length > 3, { message: 'Author is too short' }),
  genre: z
    .string()
    .min(1, { message: 'Genre is required' })
    .max(100, { message: 'Genre is too long' })
    .refine(genre => genre.length > 3, { message: 'Genre is too short' }),
  totalPages: z.string().min(1, { message: 'Total pages is required' }),
  status: z.enum(['NOT_READ', 'READING', 'FINISHED', 'WANT_TO_READ']),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description is too long' })
    .refine(description => description.length > 3, {
      message: 'Description is too short'
    }),
  imageUrl: z.string().min(1, { message: 'Image is required' })
})

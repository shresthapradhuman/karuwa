'use server'

import prisma from '@/prisma/client'
import { passwordResetSchema } from '@/schema'
import * as z from 'zod'
import bcrypt from 'bcryptjs'

export const resetPassword = async (
  values: z.infer<typeof passwordResetSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Token is missing' }
  }
  const validatedFields = passwordResetSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }
  const { password } = validatedFields.data
  const existingToken = await prisma.passwordResetToken.findFirst({
    where: {
      token
    }
  })
  if (!existingToken) {
    return { error: 'Invalid Token' }
  }
  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token has expired' }
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: existingToken.email
    }
  })

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const hashPassword = await bcrypt.hash(password, 10)
  await prisma.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashPassword
    }
  })
  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id
    }
  })
  return { success: 'Password updated successfully' }
}

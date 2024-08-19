'use server'
import prisma from '@/prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { passwordForgotSchema } from '@/schema'
import { sendPasswordResetEmail } from '../helper/sendPasswordResetEmail'

export const forgotPassword = async (data: { email: string }) => {
  const validatedFields = passwordForgotSchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message }
  }
  const { email } = validatedFields.data
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!existingUser) {
    return { error: "Email doesn't found" }
  }
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)
  const existingToken = await prisma.passwordResetToken.findFirst({
    where: {
      id: existingUser.id
    }
  })
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      email,
      expires
    }
  })

  await sendPasswordResetEmail(
    passwordResetToken?.email,
    passwordResetToken?.token,
    existingUser.name || ''
  )

  return { success: 'Reset password link sent to your email' }
}

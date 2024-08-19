'use server'
import bcrypt from 'bcryptjs'
import * as z from 'zod'
import prisma from '@/prisma/client'
import { auth } from '@/auth'
import { userSettingsSchema } from '@/schema'
import { generateVerificationToken } from '../helper/generateVerificationToken'
import { sendVerificationEmail } from '../helper/sendVerificationEmail'

export const settings = async (values: z.infer<typeof userSettingsSchema>) => {
  console.log('values', values)
  const session = await auth()
  const user = session?.user
  if (!user) return { error: 'Unauthorized' }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })
  if (!dbUser) return { error: 'Unauthorized' }
  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email
      }
    })
    if (existingUser && existingUser.id !== user.id)
      return { error: 'Email already exists.' }
    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'Verification email sent.' }
  }
  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    )
    if (!isPasswordMatch) return { error: 'Incorrect password.' }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }
  await prisma.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      name: values.name,
      email: values.email,
      ...(values.password && { password: values.password })
    }
  })
  return { success: 'Settings Updated.' }
}

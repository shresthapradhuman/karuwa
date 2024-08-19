'use server'

import prisma from '@/prisma/client'
import { registerSchema } from '@/schema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../helper/generateVerificationToken'
import { sendVerificationEmail } from '../helper/sendVerificationEmail'

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }
  const { email, password, name } = validatedFields.data
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (existingUser) {
    return { error: 'User already exists' }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(email, verificationToken.token)
  return {
    success:
      'Successfully registered. Please check your email to verify your account.'
  }
}

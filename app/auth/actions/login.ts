'use server'
import { signIn } from '@/auth'
import prisma from '@/prisma/client'
import { loginSchema } from '@/schema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../helper/generateVerificationToken'
import { sendVerificationEmail } from '../helper/sendVerificationEmail'
import { AuthError } from 'next-auth'

export const login = async (
  data: z.infer<typeof loginSchema>,
  callbackUrl?: string
) => {
  /** check fields validation */
  const validatedFields = loginSchema.safeParse(data)
  /** return error response if fields are Invalid */
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }
  /** deconstruct the validatedFields Data */
  const { email, password } = validatedFields.data

  /** check user exist or not */

  let existingUser = await prisma.user.findUnique({ where: { email } })

  /** return error response if user email and password doesn't exist */

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'User does not exist' }
  }
  /** check password match or not */
  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  /** return password not matched error response */

  if (!passwordMatch) {
    return { error: 'Wrong Email And Password Combination' }
  }

  /** check user email is verified or not */

  if (!existingUser.emailVerified) {
    /** Generate The Verification Token */
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    /** send verification token to user */
    await sendVerificationEmail(existingUser.email, verificationToken.token)
    return {
      success:
        'User is not verified. Please check your email for verification code.',
      isVerified: false
    }
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || '/dashboard'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

'use server'

import prisma from '@/prisma/client'

export const verification = async (token: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: { token }
  })
  if (!existingToken) return { error: 'Invalid Code' }
  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: 'Code has expired' }
  const existingUser = await prisma.user.findFirst({
    where: { email: existingToken.email }
  })
  if (!existingUser) return { error: 'Email does not exist' }
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email }
  })
  await prisma.verificationToken.delete({ where: { id: existingToken.id } })
  return {
    success: 'User has been successfully verified. Please login to continue.'
  }
}

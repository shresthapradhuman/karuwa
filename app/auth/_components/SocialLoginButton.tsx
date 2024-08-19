'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SocialLoginButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const onClick = () => {
    signIn('google', { callbackUrl: callbackUrl || '/dashboard' })
  }
  return (
    <Button variant={'outline'} size={'lg'} onClick={() => onClick()}>
      Google
    </Button>
  )
}

export default SocialLoginButton

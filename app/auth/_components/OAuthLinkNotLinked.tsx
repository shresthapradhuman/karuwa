'use client'
import { toast } from '@/components/ui/use-toast'
import React from 'react'

const OAuthLinkNotLinked = ({ errorMessage }: { errorMessage: string }) => {
  const [count, setCount] = React.useState(0)
  if (errorMessage === 'OAuthAccountNotLinked' && count === 0) {
    toast({
      variant: 'destructive',
      description: 'Email already in use with different auth provider.'
    })
    setCount(1)
  }
  return <></>
}

export default OAuthLinkNotLinked

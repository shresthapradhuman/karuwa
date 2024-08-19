'use client'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const BookKeywordFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <div className='relative'>
      <Input
        placeholder='Filter by title..'
        className='h-8 w-[150px] lg:w-[250px]'
        onChange={e => {
          const keyword = e.target.value
          const params = new URLSearchParams()
          if (keyword) params.append('keyword', keyword)
          if (searchParams.get('status'))
            params.append('status', searchParams.get('status')!)
          const query = params.size ? `?${params.toString()}` : ''
          router.push('/dashboard/books' + query)
        }}
      />
    </div>
  )
}

export default BookKeywordFilter

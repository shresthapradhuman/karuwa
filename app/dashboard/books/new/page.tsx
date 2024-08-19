import dynamic from 'next/dynamic'
import React from 'react'

const BookForm = dynamic(() => import('../_components/BookForm'), {
  ssr: false
})

const NewBookPage = () => {
  return (
    <div className='p-4'>
      <BookForm />
    </div>
  )
}

export default NewBookPage

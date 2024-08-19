import React, { PropsWithChildren } from 'react'
import TopbarHeader from './_components/TopbarHeader'

const DasbhboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='grid h-full min-h-screen w-full grid-rows-[auto_1fr]'>
      <TopbarHeader />
      {children}
    </div>
  )
}

export default DasbhboardLayout

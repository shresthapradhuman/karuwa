import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t bg-foreground py-8 text-background'>
      <div className='container flex max-w-6xl flex-col items-center justify-between px-4 md:flex-row md:px-6'>
        <div className='flex items-center'>
          <p className='mt-4 text-base md:mt-0'>
            &copy; 2024 Karuwa. All rights reserved.
          </p>
        </div>
        <nav className='mt-4 flex items-center space-x-6 md:mt-0'>
          <Link href='#' prefetch={false}>
            Terms of Service
          </Link>
          <Link href='#' prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

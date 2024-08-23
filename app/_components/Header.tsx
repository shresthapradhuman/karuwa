import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 border-b bg-background'>
      <div className='container flex h-16 max-w-6xl items-center justify-between px-4 md:px-6'>
        <Link href='/' className='flex items-center' prefetch={false}>
          <span className='text-xl font-black tracking-tight'>TR-ACKER</span>
        </Link>
        <nav className='hidden items-center space-x-6 md:flex'>
          <Link
            href='#feature'
            className='text-muted-foreground hover:text-foreground'
            prefetch={false}
          >
            Our Features
          </Link>
          <Link
            href='#joinus'
            className='text-muted-foreground hover:text-foreground'
            prefetch={false}
          >
            Join us!
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

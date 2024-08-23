'use client'
import UserButton from '@/app/auth/_components/UserButton'
import Link from 'next/link'
import React from 'react'
import TopbarMobile from './TopbarMobile'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const TopbarHeader = () => {
  const pathname = usePathname()
  return (
    <header className='flex h-14 items-center border-b shadow'>
      <nav className='flex w-full items-center px-4'>
        <TopbarMobile />
        <h1 className='hidden text-xl font-black uppercase tracking-tight md:flex'>
          TR-ACKER
        </h1>
        <ul className='ml-8 hidden items-center space-x-6 text-base md:flex'>
          <li>
            <Link
              href={'/dashboard'}
              className={cn({
                'text-primary': pathname === '/dashboard',
                'text-inherit': pathname !== '/dashboard'
              })}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={'/dashboard/books'}
              className={cn({
                'text-primary':
                  pathname.replace('/dashboard/', '').split('/')[0] === 'books'
              })}
            >
              Books
            </Link>
          </li>
        </ul>
        <div className='ml-auto'>
          <UserButton />
        </div>
      </nav>
    </header>
  )
}

export default TopbarHeader

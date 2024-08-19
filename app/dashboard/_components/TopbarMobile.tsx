'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import { PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TopbarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='mr-2 sm:hidden'>
          <PanelLeft className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='sm:max-w-xs'>
        <nav className='grid pt-5'>
          <SheetClose
            asChild
            className='p-2 hover:bg-primary hover:text-primary-foreground'
          >
            <Link href={'/dashboard'}>Dashboard</Link>
          </SheetClose>
          <SheetClose
            asChild
            className='p-2 hover:bg-primary hover:text-primary-foreground'
          >
            <Link href={'/dashboard/books'}>Book List</Link>
          </SheetClose>
          <SheetClose
            asChild
            className='p-2 hover:bg-primary hover:text-primary-foreground'
          >
            <Link href={'/dashboard/analytics'}>Analytics</Link>
          </SheetClose>
          <SheetClose
            asChild
            className='p-2 hover:bg-primary hover:text-primary-foreground'
          >
            <Link href={'/dashboard/profile'}>Profile</Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default TopbarMobile

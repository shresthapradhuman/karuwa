'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, Settings, User } from 'lucide-react'

import Link from 'next/link'

const UserButton = () => {
  const session = useSession()
  const user = session?.data?.user
  const handleLogout = () => {
    signOut()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} alt='User' />
          <AvatarFallback className='bg-primary'>
            <User className='h-5 w-5 text-primary-foreground' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto' align='end'>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href='/dashboard/profile'>
            <Settings className='mr-2 h-4 w-4' />
            Magage Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton

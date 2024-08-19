'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { DeleteIcon, EditIcon, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { deleteBook } from '../actions'

const BooksActions = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/books/edit/${id}`}
            className='flex items-center text-primary'
          >
            <EditIcon className='mr-2 h-4 w-4' /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='text-red-500'
          onClick={async () => {
            await deleteBook(id).then(response => {
              if (response?.error) {
                toast({
                  variant: 'destructive',
                  description: response.error
                })
                return
              }
              toast({
                description: 'Book deleted successfully',
                className: 'bg-green-500 text-white'
              })
            })
          }}
        >
          <DeleteIcon className='mr-2 h-4 w-4' /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BooksActions

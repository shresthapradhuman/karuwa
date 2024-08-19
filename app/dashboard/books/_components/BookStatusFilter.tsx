'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CheckIcon, SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const BookStatusFilter = () => {
  const options = ['READING', 'NOT_READ', 'WANT_TO_READ', 'FINISHED']
  const statusDisplayNames = {
    READING: 'Reading',
    NOT_READ: 'Not Read',
    WANT_TO_READ: 'Want to Read',
    FINISHED: 'Completed'
  }
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'sm'} className='h-8 border-dashed'>
          <SlidersHorizontal className='mr-2 h-4 w-4' />
          Status
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Filter by status' />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map(status => (
                <CommandItem
                  key={status}
                  onSelect={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    if (params.get('status') === status) {
                      params.delete('status')
                    } else {
                      params.set('status', status)
                    }
                    const query = params.size ? `?${params.toString()}` : ''
                    router.push('/dashboard/books' + query)
                  }}
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      searchParams.get('status') === status
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon className={cn('h-4 w-4')} />
                  </div>
                  {
                    statusDisplayNames[
                      status as keyof typeof statusDisplayNames
                    ]
                  }
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default BookStatusFilter

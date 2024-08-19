'use client'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface BooksPaginationProps {
  itemCount: number
  pageSize: number
  currentPage: number
}

const BooksPagination = ({
  itemCount,
  pageSize,
  currentPage
}: BooksPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push('?' + params.toString())
  }

  return (
    <div className='flex items-center gap-2'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className='mr-1 h-4 w-4' /> Previous
            </Button>
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => changePage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              Next <ChevronRightIcon className='ml-1 h-4 w-4' />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default BooksPagination

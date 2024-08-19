import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Book, STATUS } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import BooksActions from './BooksActions'
import Link from 'next/link'
import { ChevronsUpDownIcon } from 'lucide-react'

export interface BookQuery {
  status: STATUS
  sortBy: keyof Book
  sortOrder: 'asc' | 'desc'
  page: string
  keyword: string
}

interface BooksTableProps {
  data: Book[]
  searchParams: BookQuery
}

const BooksTable = ({ searchParams, data }: BooksTableProps) => {
  return (
    <div className='rounded-md border'>
      <Table className='table-auto'>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.value} className={column.className}>
                {column.value !== 'imageUrl' ? (
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        sortBy: column.value,
                        sortOrder:
                          searchParams.sortBy === column.value
                            ? searchParams.sortOrder === 'asc'
                              ? 'desc'
                              : 'asc'
                            : 'asc'
                      }
                    }}
                  >
                    {column.label}
                    <ChevronsUpDownIcon className='ml-2 inline-flex h-4 w-4 items-center' />
                  </Link>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className='table-cell w-[5%]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(book => (
            <TableRow key={book.id}>
              {columns.map(column => (
                <TableCell key={column.value} className={column.className}>
                  {column.value === 'imageUrl' ? (
                    <Image
                      src={'/no-image.png'}
                      width={50}
                      height={50}
                      alt='image'
                      priority
                      className='mx-auto h-10 w-10 rounded-md object-cover'
                    />
                  ) : column.value === 'status' ? (
                    <Badge
                      className={cn({
                        'bg-green-500 hover:bg-green-600':
                          book.status === 'NOT_READ',
                        'bg-blue-500 hover:bg-blue-600':
                          book.status === 'READING',
                        'bg-yellow-500 hover:bg-yellow-600':
                          book.status === 'WANT_TO_READ',
                        'bg-gray-500 hover:bg-gray-600':
                          book.status === 'FINISHED'
                      })}
                    >
                      {STATUS[book.status] === 'READING'
                        ? 'Reading'
                        : STATUS[book.status] === 'FINISHED'
                          ? 'Completed'
                          : STATUS[book.status] === 'WANT_TO_READ'
                            ? 'Want to Read'
                            : 'Not Started'}
                    </Badge>
                  ) : (
                    (book[column.value] as string)
                  )}
                </TableCell>
              ))}
              <TableCell className='table-cell w-[5%] text-center'>
                <BooksActions id={book.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const columns: {
  label: string
  value: keyof Book
  className?: string
}[] = [
  {
    value: 'imageUrl',
    label: '#',
    className: 'text-center hidden md:table-cell w-[100px]'
  },
  {
    value: 'title',
    label: 'Title'
  },
  {
    value: 'author',
    label: 'Author',
    className: 'hidden md:table-cell w-[220px]'
  },
  {
    value: 'genre',
    label: 'Genre',
    className: 'hidden md:table-cell w-[220px]'
  },
  {
    value: 'status',
    label: 'Status',
    className: 'hidden md:table-cell text-center w-[220px]'
  },
  {
    value: 'totalPages',
    label: 'Pages',
    className: 'hidden md:table-cell text-center w-[150px]'
  }
]

export const columnNames = columns.map(column => column.value)

export default BooksTable

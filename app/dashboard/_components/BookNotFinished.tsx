'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function BookNotFinished({
  numberOfBooks,
  percentage
}: {
  numberOfBooks: number
  percentage: number
}) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>Books Not Read</CardDescription>
        <CardTitle className='text-4xl'>{numberOfBooks}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xs text-muted-foreground'>
          {percentage}% of total books yet not read.
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={percentage} aria-label='12% increase' />
      </CardFooter>
    </Card>
  )
}

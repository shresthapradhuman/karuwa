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

export default function BookStatus({
  title,
  value,
  progress
}: {
  title: string
  value: number
  progress?: number
}) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardDescription>Books completed this {title}</CardDescription>
        <CardTitle className='text-4xl'>{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xs text-muted-foreground'>
          +{progress?.toFixed(2)}% from last {title}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={progress} aria-label='increases' />
      </CardFooter>
    </Card>
  )
}

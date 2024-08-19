import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import VerificationForm from '../_components/VerificationForm'

const VerificationPage = () => {
  return (
    <div className='w-full max-w-sm md:max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle> User Email Verification </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationForm />
        </CardContent>
        <CardFooter className='flex text-sm'>
          <Link href='/auth/login' className='ml-auto flex items-center'>
            <ArrowLeftIcon className='mr-1 h-4 w-4' /> Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerificationPage

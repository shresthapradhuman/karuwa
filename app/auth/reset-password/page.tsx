import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ResetPasswordForm from '../_components/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <div className='flex max-w-sm items-center md:max-w-md'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Reset Password ?</CardTitle>
          <CardDescription>
            Enter your new password to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <Link
            href='/auth/login'
            className='mt-4 flex items-center justify-center text-sm font-medium'
          >
            <ArrowLeftIcon className='mr-1 h-4 w-4' /> Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ResetPasswordPage

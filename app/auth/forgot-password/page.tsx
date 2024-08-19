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
import ForgotPasswordForm from '../_components/ForgotPasswordForm'

const ForgotPasswordPage = () => {
  return (
    <div className='flex w-full max-w-sm items-center md:max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password ?</CardTitle>
          <CardDescription>
            No worries! enter your email to send password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
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

export default ForgotPasswordPage

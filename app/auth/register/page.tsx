import Image from 'next/image'
import React from 'react'
import RegisterForm from '../_components/RegisterForm'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import SocialLoginButton from '../_components/SocialLoginButton'

const RegisterPage = () => {
  return (
    <div className='grid w-full max-w-sm md:max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle>Create an account!</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* register form */}
          <RegisterForm />
        </CardContent>
        <CardFooter className='grid gap-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          {/* social login button */}
          <SocialLoginButton />
        </CardFooter>
        <CardFooter className='flex items-center justify-center'>
          Already have an account?{' '}
          <Link
            href='/auth/login'
            className='ml-2 text-primary hover:underline'
          >
            {' '}
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage

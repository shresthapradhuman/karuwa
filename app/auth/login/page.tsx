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
import SocialLoginButton from '../_components/SocialLoginButton'
import LoginForm from '../_components/LoginForm'

const LoginPage = () => {
  return (
    <div className='grid w-full max-w-sm md:max-w-md'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            Enter your details below to login your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* form content */}
          <LoginForm />
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
          {/* social login section */}
          <SocialLoginButton />
        </CardFooter>
        <CardFooter className='flex items-center justify-center'>
          Don&apos;t have an account?{' '}
          <Link
            href='/auth/register'
            className='ml-2 text-primary hover:underline'
          >
            {' '}
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage

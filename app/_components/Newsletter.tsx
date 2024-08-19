import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Newsletter = () => {
  return (
    <section
      className='w-full bg-gradient-to-l from-primary/60 to-secondary py-12 md:py-24 lg:py-24'
      id='joinus'
    >
      <div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6'>
        <div className='space-y-3'>
          <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
            Join the Read Track Community
          </h2>
          <p className='mx-auto max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
            Subscribe to our Read Track and stay up to date with the latest
            news, updates, and features.
          </p>
        </div>
        <div className='w-full'>
          <form className='flex items-center justify-center gap-2'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='flex h-11 w-full max-w-md'
            />
            <Button size={'lg'}>Join us!</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

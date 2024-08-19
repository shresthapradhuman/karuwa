import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='py-14 md:py-10'>
      <div className='container flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:px-6'>
        <div className='max-w-xl space-y-4'>
          <h1 className='text-4xl font-bold md:text-6xl md:leading-tight'>
            Start Tracking Your <span className='text-primary'>Reading</span>{' '}
            Habits
          </h1>
          <p className='text-lg text-muted-foreground md:text-xl'>
            Discover new books, set reading goals, and stay motivated with our
            powerful reading habit tracking platform. Effortlessly track your
            reading habits and unlock your full potential.
          </p>
          <div className='py-4'>
            <Link
              href='/dashboard'
              className={buttonVariants({
                size: 'lg',
                className: 'text-sm font-medium'
              })}
              prefetch={false}
            >
              Get Started
            </Link>
          </div>
        </div>
        <Image
          src='/hero.png'
          width='500'
          height='500'
          alt='Hero'
          className='mx-auto max-w-[400px] md:max-w-none'
        />
      </div>
    </section>
  )
}

export default Hero

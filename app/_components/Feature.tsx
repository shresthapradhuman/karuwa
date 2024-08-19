import {
  CalendarDaysIcon,
  PencilIcon,
  TargetIcon,
  TrendingUpIcon
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Feature = () => {
  return (
    <section
      className='w-full bg-secondary py-12 md:py-24 lg:py-24'
      id='feature'
    >
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-3'>
            <div className='inline-block rounded-lg bg-muted px-3 py-1 text-lg'>
              <span className='text-primary'>Our Key Features</span>
            </div>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              What Makes Us Different
            </h2>
            <p className='max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Read Track provides a suite of tools to help you track your
              reading progress, discover new books, and stay motivated.
            </p>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
          <Image
            src='/teaching.png'
            width='550'
            height='310'
            alt='Features'
            className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
          />
          <div className='flex flex-col justify-center space-y-4'>
            <ul className='flex flex-col space-y-4'>
              <li className='flex items-start space-x-8'>
                <CalendarDaysIcon className='mt-1 h-8 w-7 text-primary' />
                <div className='flex flex-1 flex-col gap-y-2'>
                  <h3 className='text-xl font-bold'>Reading Tracker</h3>
                  <p className='text-muted-foreground'>
                    Keep track of the books you&apos;ve read, the ones
                    you&apos;re currently reading, and your reading goals.
                  </p>
                </div>
              </li>
              <li className='flex items-start space-x-8'>
                <TargetIcon className='mt-1 h-8 w-7 text-primary' />
                <div className='flex flex-1 flex-col gap-y-2'>
                  <h3 className='text-xl font-bold'>Set Reading Goals</h3>
                  <p className='text-muted-foreground'>
                    Establish reading goals and track your progress to stay
                    motivated.
                  </p>
                </div>
              </li>
              <li className='flex items-start space-x-8'>
                <PencilIcon className='mt-1 h-8 w-7 text-primary' />
                <div className='flex flex-1 flex-col gap-y-2'>
                  <h3 className='text-xl font-bold'>Notes and Highlights</h3>
                  <p className='text-muted-foreground'>
                    Take notes and highlight important passage as you read.
                  </p>
                </div>
              </li>
              <li className='flex items-start space-x-8'>
                <TrendingUpIcon className='mt-1 h-8 w-7 text-primary' />
                <div className='flex flex-1 flex-col gap-y-2'>
                  <h3 className='text-xl font-bold'>Analyze Your Habits</h3>
                  <p className='text-muted-foreground'>
                    Gain insights into your reading patterns and progress over
                    time.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature

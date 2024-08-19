import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckIcon } from 'lucide-react'
import React from 'react'

const Pricing = () => {
  const data = [
    {
      title: 'Free',
      description: 'For beginners',
      price: '$0',
      period: 'per month',
      features: [
        'Track reading progress',
        'Add 5 books to your reading list',
        'Set reading goals',
        'Basic reading insights'
      ]
    },
    {
      title: 'Basic',
      description: 'For casual readers',
      price: '$4.99',
      period: 'per month',
      features: [
        'Track reading progress',
        'Set reading goals',
        'Add 100 books to your reading list',
        'Basic reading insights',
        'Note And Highlight'
      ]
    },
    {
      title: 'Premium',
      description: 'For avid readers',
      price: '$9.99',
      period: 'per month',
      features: [
        'Track reading progress',
        'Set reading goals',
        'Add Unlimited to your reading list',
        'Advanced reading insights',
        'Note And Highlight'
      ]
    }
  ]
  return (
    <section className='w-full bg-muted py-12 md:py-24 lg:py-24' id='pricing'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-3'>
            <div className='inline-block px-3 py-1 text-lg' id='pricing'>
              <span className='text-primary'>Our Pricing</span>
            </div>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Choose Your Plan
            </h2>
            <p className='max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Choose the plan that works best for you. All plans come with a
              14-day free trial.
            </p>
          </div>
        </div>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {data.map((item, index) => (
            <Card className='relative flex flex-col space-y-2' key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className='h-full'>
                <div className='space-y-2'>
                  <p className='text-4xl font-bold'>{item.price}</p>
                  <p className='text-muted-foreground'>{item.period}</p>
                </div>
                <ul className='mt-6 space-y-2 text-muted-foreground'>
                  {item.features.map((feature, index) => (
                    <li key={index}>
                      <CheckIcon className='mr-2 inline-block h-4 w-4' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size={'lg'}>Subscribe</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

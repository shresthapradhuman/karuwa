import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind
} from '@react-email/components'

interface VerificationEmailProps {
  validationCode: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const VerificationEmail = ({ validationCode }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email address</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section className='text-xl'>Welcome to Karuwa! </Section>
            <Heading className='text-3xl font-semibold'>
              Confirm your email address
            </Heading>
            <Text className='text-base text-muted-foreground'>
              Your confirmation code is below - enter it in your open browser
              window and we&apos;ll help you get signed in.
            </Text>
            <Section className='bg-gray-400 px-3 py-10'>
              <Text className='text-center text-3xl'>{validationCode}</Text>
            </Section>
            <Text className='text-base text-muted-foreground'>
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about, you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default VerificationEmail

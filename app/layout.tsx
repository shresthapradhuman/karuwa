import type { Metadata } from 'next'
import { Rajdhani as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'TR-ACKER',
  description:
    ' TR-ACKER is a platform for managing your books and tracking your reading .'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang='en' suppressHydrationWarning>
      <SessionProvider session={session}>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}

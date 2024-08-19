import Feature from './_components/Feature'
import Footer from './_components/Footer'
import Header from './_components/Header'
import Hero from './_components/Hero'
import Newsletter from './_components/Newsletter'

export default function Home() {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <Header />
      <main className='flex-1'>
        <Hero />
        <Feature />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

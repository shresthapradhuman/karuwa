import dynamic from 'next/dynamic'
import React from 'react'

const UserSettings = dynamic(
  () => import('@/app/auth/_components/UserSettings'),
  {
    ssr: false
  }
)

const ProfilePage = () => {
  return (
    <div className='p-4'>
      <UserSettings />
    </div>
  )
}

export default ProfilePage

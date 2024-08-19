import { FormDescription, FormLabel } from '@/components/ui/form'
import { CameraIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ImageUploaderLabel = ({ image }: { image: string | null }) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='text-center text-lg font-bold'>Upload Cover Image</div>
      <FormLabel
        className='flex h-[250px] w-[200px] cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-gray-600 text-base capitalize text-inherit transition-colors duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50 hover:text-gray-800'
        htmlFor='image'
      >
        {!image && (
          <>
            <CameraIcon className='h-8 w-8' />
            <span>Book Cover</span>
          </>
        )}
        {image && (
          <Image
            src={image}
            alt='cover-image'
            width={100}
            height={100}
            className='h-[250px] w-[200px] rounded-lg object-contain p-2'
          />
        )}
      </FormLabel>
      <FormDescription className='text-center'>
        Recommended Size <br /> (200px*250px)
      </FormDescription>
    </div>
  )
}

export default ImageUploaderLabel

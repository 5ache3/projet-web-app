import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function Page() {
  return (
    <main className='flex h-screen w-full items-center justify-around '>
        <SignUp/>
    </main>
  )
}

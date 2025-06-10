import NotifficationsList from '@/components/lists/NotifficationsList'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

export default async function page() {
  const user = await currentUser();
  const u_id = user?.id;
  return (
    <div className='text-white'>
      <NotifficationsList u_id={u_id} />
    </div>
  )
}
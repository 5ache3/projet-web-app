import { User } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function UserCard({user}:{user:User}) {
  return (
    <div className='border-gray-100 border-1 rounded-lg p-2 '>
        <div className='flex gap-3'>
            <div>
                <Avatar key={user.id} className='w-12 h-12'>
                <AvatarImage src={ user.image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name.trim()[0]}`} />
                <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
            </div>
            <div className=''>
                <div className='text-gray-1'>@{user.username}</div>
                <div className=''>{}</div>
            </div>
        </div>
    </div>
  )
}

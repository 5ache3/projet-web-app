'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Trash } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { User } from '@/constants/types'

export default function UserCard({ user, u_id, u_role, p_id }: { user: User, u_id: string, u_role: string | undefined, p_id: string }) {
  const [confirmation, setConfirmation] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter();

  const cickUser = async () => {
    const data = {
      projectId: p_id,
      userId: user.id
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/projects/removeMember`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error(`error`)
        return
      }
      if(response.ok){
        // const message_response = await fetch(`/api/notifications/user/${u_id}/${p_id}`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ message: message, destinataireId: user.id, title: `you have been removed` }),
        // });
        // if (!message_response.ok) {
        //   toast.error(`error`)
        //   return
        // }
      }

      toast.success("deleted")
      setConfirmation(false)
      setMessage('')
      router.refresh();
    } catch (error) {
      if (error) {
        toast.error(`${error}`)
      }
    }
  }
  return (
    <div className='border-gray-100 border-1 rounded-lg p-2 '>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div>
            <Avatar key={user.id} className='w-12 h-12'>
              <AvatarImage src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username.trim()[0]}`} />
              <AvatarFallback>{user.name||user.username}</AvatarFallback>
            </Avatar>
          </div>
          <div className=''>
            <div className='text-gray-1'>@{user.username}</div>
            {u_id == user.id && (<div className='font-semibold text-gray-300'>admin</div>)}
          </div>
        </div>
        <div>
          {u_role === 'owner' && (
            <Popover>
              <PopoverTrigger asChild>
                <Image className='cursor-pointer'
                  alt='actions'
                  src={'/assets/more.svg'}
                  height={24}
                  width={24}
                />
              </PopoverTrigger>

              <PopoverContent className='flex flex-col gap-3 bg-gray-100 rounded-xl'>

                {(u_id != user.id) && (
                  <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                    onClick={() => { setConfirmation(true) }}>
                    <Trash />
                  </div>
                )}

              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>


      <Dialog open={confirmation} onOpenChange={() => { setConfirmation(false) }}>
        <DialogTitle className='hidden'>Complete Task</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-80 text-white'>
          <form className='flex flex-col gap-4 '
            onSubmit={(event) => {
              event.preventDefault();
              cickUser();
            }}>
            <div className='project-title-insertion flex flex-col gap-2'>
              are you sure ?
            </div>
            <div className='flex flex-col gap-2'>
              <label>Message</label>
              <textarea
                rows={2}
                value={message || ''}
                onChange={(event) => { setMessage(event.target.value) }}
                className='bg-white rounded-md text-black font-semibold p-4 text-sm'
              ></textarea>
            </div>
            <Button className='bg-white text-black font-semibold h-10 mt-5 hover:bg-amber-100'>confirm</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

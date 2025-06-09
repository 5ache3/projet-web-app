import React, { use } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { User, User_Project } from '@prisma/client';
import UserCard from '../cards/UserCard';

export default function MembersList({isOpen,onClose,users,u_id,u_role}:{isOpen:boolean,onClose:()=>void,users:User[],u_id:string,u_role?:string}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>leaving project</DialogTitle>
        <DialogContent className=' m-auto flex flex-col p-3 pt-15 px-10 bg-mainbg-2 w-full text-white'>
            {users.map((user,index) => (
                    <UserCard key={index} user={user}/>
                  ))}
        </DialogContent>
    </Dialog>
  )
}

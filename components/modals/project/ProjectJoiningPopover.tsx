'use client'
import { useSession } from '@/app/session.context';
import { Button } from '@/components/ui/button';
import { DialogTitle,Dialog, DialogContent } from '@/components/ui/dialog';
import { requestToJoin } from '@/reusable/mthods';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function ProjectJoiningPopover(
    {project_id,title,description,isOpen,onClose}
    :{project_id:string,title:string,description:string,isOpen:boolean,onClose:()=>void}) {

    const router=useRouter();
    const session=useSession();
    const u_id=session.userId; 
    if(!u_id){return}
    const joinProject = async ()=>{
        onClose();
        const data={
            projectId:project_id,
            userId:u_id
        }
            try{
            const response = requestToJoin({u_id,project_id})
            toast.success("requested ")
            router.refresh()
        }catch(error){
            if(error){
                toast.error(`${error}`)
            }
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>join project</DialogTitle>
        <DialogContent className='flex flex-col p-6 px-10 bg-mainbg-2 w-full text-white'>
            <div className='text-center font-semibold text-sm'>you are not in this project</div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 text-gray-1'>
                    title <span className='text-white'>{title}</span>
                </div>
                {description&&(
                <div className='flex gap-4 text-gray-1'>
                    Description <span className='text-white'>{description}</span>
                </div>
                )}
            </div>
            <Button className='bg-white text-black hover:text-white' onClick={()=>{joinProject()}}>Join project</Button>
        </DialogContent>
    </Dialog>
  )
}

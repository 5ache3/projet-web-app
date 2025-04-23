import { Button } from '@/components/ui/button';
import { DialogTitle,Dialog, DialogContent } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function ProjectJoiningPopover(
    {project_id,title,description,isOpen,onClose}
    :{project_id:string,title:string,description:string,isOpen:boolean,onClose:()=>void}) {

    const { user } = useUser();
    const router=useRouter();
    const u_id=user?.id  
    const joinProject = async ()=>{
        onClose();
        const data={
            project_id:project_id,
            user_id:u_id
        }
            try{
            const response = await fetch(`/api/user/${u_id}/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(response.status===403){
                toast.error("project already joined")
                return
            }
            if(!response.ok){
                toast.error(`error project not found`)
                return
            }
            toast.success("joined ")
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

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export default function LeaveProject(
    {project_id,title,description,isOpen,onClose}
    :{project_id:string,title?:string,description?:string,isOpen:boolean,onClose:()=>void}) {

    const { user } = useUser();
    const router=useRouter();
    const u_id=user?.id  
    const leaveProject = async ()=>{
        onClose();
        const data={
            project_id:project_id,
            user_id:u_id
        }
            try{
            const response = await fetch(`/api/user/${u_id}/projects`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(!response.ok){
                toast.error(`error`)
                return
            }
            toast.success("deleted")
            router.refresh();
        }catch(error){
            if(error){
                toast.error(`${error}`)
            }
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>leaving project</DialogTitle>
        <DialogContent className='flex flex-col p-6 px-10 bg-mainbg-2 w-full text-white'>
            <div className='text-center font-semibold text-sm'>are you sure you want to leave this project ?</div>
            {/* <div className='flex flex-col gap-2'>
                <div className='flex gap-4 text-gray-1'>
                    title <span className='text-white'>{title}</span>
                </div>
                {description&&(
                <div className='flex gap-4 text-gray-1'>
                    Description <span className='text-white'>{description}</span>
                </div>
                )}
            </div> */}
            <Button className='bg-white text-black hover:text-white' onClick={()=>{leaveProject()}}>Leave</Button>
        </DialogContent>
    </Dialog>
  )
}

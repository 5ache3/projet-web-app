'use client'
import { useSession } from '@/app/session.context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface promps{
    isOpen:boolean
    p_id:string
    onClose?:()=>void
    handleSubmit:()=>void
    closeDialog:()=>void
}

export default function ProjectDeletion({isOpen,p_id,
    onClose,
    handleSubmit,
    closeDialog,}:promps) {
    
        const router=useRouter()
    const [message,setMessage]=useState('');
    const [checked,setChecked]=useState(false)
    const session=useSession();
    const u_id=session.userId;
    const onSubmit = async () => {
        if(!checked){
            toast.error("please confirm")
            return
        }
        if(message.length<1){
            toast.error("please add a confirmation message")
            return
        }
        setChecked(false)
        closeDialog();
        try{
            const data= {
                project_id:p_id,
                user_id:u_id
              }
              
            const response = await fetch(`/api/user/${u_id}/projects`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            if(response.ok){
                toast.success("deleted")
                handleSubmit()
                setMessage('')
                router.push('/projects')
            }else{
                toast.error("error")
            }

        }catch(error){
            console.log('error: ',error)
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Delete Project</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-80 text-white'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    <div className='project-title-insertion flex items-center gap-2'>
                        Confirm <Checkbox checked={checked} onClick={()=>{setChecked(!checked)}} color='green'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Message</label>
                        <textarea
                        rows={2} 
                        value={message||''} 
                        onChange={(event)=>{setMessage(event.target.value)}}
                        className='bg-white rounded-md text-black font-semibold p-4 text-sm'
                        ></textarea> 
                    </div>
                <Button className='bg-white text-black font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

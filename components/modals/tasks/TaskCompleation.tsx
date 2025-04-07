
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Task } from '@/constants/types'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleSubmit:()=>void
    closeDialog:()=>void
    index:number
    tasks:Task[]
}


export default function TasktCompletion({
    isOpen,
    onClose,
    handleSubmit,
    closeDialog,
    index,
    tasks}:promps) {
    
    const [message,setMessage]=useState('');
    const [task,setTask]=useState(tasks[index])
    const onSubmit = async () => {
        closeDialog();
        try{
            const data= {
                id:task.id,
                title:task.title,
                project_id:task.project_id,
                description:task.description,
                created_at:task.created_at,
                completed:true
              }
              
            const response = await fetch(`/api/projects/${task.project_id}/tasks/${task.id}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            if(response.ok){
                toast.success("updated")
                handleSubmit()
                setMessage('')
            }else{
                toast.error("error")
            }

        }catch(error){
            console.log('error: ',error)
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Complete Task</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-80 text-white'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    <div className='project-title-insertion flex flex-col gap-2'>
                        <div> Name: <span className='text-gray-1'>{task.title}</span></div>

                        <div> Description: <span className='text-gray-1'>{task.description}</span></div>
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
                    <Checkbox/>   
                <Button className='bg-white text-black font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

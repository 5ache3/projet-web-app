
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { useParams} from 'next/navigation'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Task } from '@/constants/types'

interface promps{
    isOpen:boolean
    onClose?:()=>void
    // handleSubmit:()=>void
    closeDialog:()=>void
    index:number
    tasks:Task[]
}


export default function TasktActions({
    isOpen,
    onClose,
    closeDialog,
    index,
    tasks}:promps) {
    const [task,setTask]=useState(tasks[index])
    const [name,setName]=useState(task.title);
    const [description,setDescription]=useState(task.description);
    const onSubmit = async () => {
        closeDialog();
        if(!name){
            toast.error('enter task name')
            return
        }
        try{
            const data= {
                id:task.id,
                title:name,
                project_id:task.project_id,
                description:description,
                created_at:task.created_at,
                completed:task.completed
              }
              
            const response = await fetch(`/api/projects/${task.project_id}/tasks/${task.id}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(response.ok){
                toast.success("updated")
            }else{
                toast.error("error")
            }

        }catch(error){
            console.log('error: ',error)
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Edit Task</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-100 text-white'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    <div className='project-title-insertion flex flex-col gap-2'>
                        <label>Task Name</label>
                        <input 
                        type='text' 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        className='bg-white h-13 rounded-xl text-black font-semibold px-4' 
                        placeholder='Name' required/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea
                        rows={5} 
                        value={description||''} 
                        onChange={(event)=>{setDescription(event.target.value)}}
                        className='bg-white rounded-xl text-black font-semibold p-4'
                        ></textarea> 
                    </div>
                    <Checkbox/>   
                <Button className='bg-white text-black font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

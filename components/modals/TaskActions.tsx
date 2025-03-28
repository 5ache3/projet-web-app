
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useParams} from 'next/navigation'
import { Checkbox } from '@radix-ui/react-checkbox'
interface promps{
    isOpen:boolean
    id:string
    Title:string
    Description:string
    Completed:boolean
    onClose?:()=>void
    handleClick?:()=>void
    closeDialog:()=>void
}
export default function TasktActions({
    isOpen,
    onClose,
    closeDialog,
    task}:promps) {
    
    const [name,setName]=useState(task.title);
    const [description,setDescription]=useState(task.description);
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
        <DialogContent className='flex flex-col p-10 bg-dark-2 w-100 text-white'>
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
                <Button className='bg-white text-dark-1 font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

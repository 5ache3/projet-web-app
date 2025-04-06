
'use client'
import{useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'

type Task={
  id: string,
  title: string,
  project_id: string,
  description: string,
  created_at: Date,
  completed: boolean
}

interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleCreation:(created:Task)=>void
    closeDialog:()=>void
}
export default function TasktCreation({isOpen,onClose,handleCreation,closeDialog}:promps) {
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const params = useParams();
    const id=params.id;
    const router=useRouter()
    const onSubmit = async () => {
        closeDialog();
        if (!name) {
          toast.error("Please enter a task anme");
          return;
        }
      
        try {
            const data= {
              title: name,
              project_id: id, 
              description: description || null,
            }
            
            const response = await fetch(`/api/projects/${id}/tasks`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const created=await response.json()
              handleCreation(created)
              
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }else{
                setDescription('')
                setName('')
              }
          
          toast.success("Task created ✅");
          router.push(`/projects/${id}`)
        } catch (error) {
          toast.error("Something went wrong.");
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Add Task</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-dark-2 w-full text-white'>
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
                <Button className='bg-white text-dark-1 font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}


'use client'
import{ useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import {Calendar} from '../ui/calendar'
import { CalendarForm } from '../ui/forms/calendarForm'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
    closeDialog:()=>void
}
export default function ProjectCreation({isOpen,onClose,handleClick,closeDialog}:promps) {
    const [date, setDate] = useState<Date | undefined>();
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const { user } = useUser();
    const id=user?.id||'user_2ur3IAd0kdkdfAd4mC7lREJcYyX';
    const onSubmit = async () => {
        closeDialog();
        if (!name || !date) {
          toast.error("Please enter a project name and deadline.");
          return;
        }
      
        if (!id) {
          toast.error("You must be logged in.");
          return;
        }
        try {
            const data= {
              title: name,
              owner_id: id, 
              description: description || null, // Ensure description is either string or null
              deadline: date ? new Date(date) : null, // Convert to Date if not null
            }
            
            const response = await fetch("/api/projects", {
                method: "POST", // ✅ Ensure this is POST
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
            
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }else{
                setDescription('')
                setName('')
                setDate(undefined)
              }
          
          toast.success("Project created successfully!");
        } catch (error) {
          toast.error("Something went wrong.");
        }
      };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Create Project</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-dark-2 w-full text-white'>
            <form className='flex flex-col gap-4 '
                        onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                        }}>
                    
                    <div className='project-title-insertion flex flex-col gap-2'>
                        <label>Project Name</label>
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
                <div>
                    <CalendarForm handleChange={(value:Date|undefined)=>{setDate(value)}}/>
                </div>

                {/* <div className='flex justify-around mt-2'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-65 flex justify-around"
                    />
                </div> */}
                <Button className='bg-white text-dark-1 font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

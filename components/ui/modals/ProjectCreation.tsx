import{ useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../dialog'
import {Calendar} from '../calendar'
import { CalendarForm } from '../forms/calendarForm'
import { Button } from '../button'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
}
export default function ProjectCreation({isOpen,onClose,handleClick}:promps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Create Project</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-dark-2 w-full text-white'>
            <div className='flex flex-col gap-4 '>
                <div className='project-title-insertion flex flex-col gap-2'>
                    <label>Project Name</label>
                    <input type='text' className='bg-white h-13 rounded-xl text-black font-semibold px-4' placeholder='Name' required/>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <label>Description</label>
                    <textarea rows={5} className='bg-white rounded-xl text-black font-semibold p-4' ></textarea>    
                </div>
                <div>
                    <CalendarForm/>
                </div>

                {/* <div className='flex justify-around mt-2'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-65 flex justify-around"
                    />
                </div> */}
            </div>
            <Button className='bg-white text-dark-1 font-semibold h-10 mt-5 hover:bg-amber-100'>submit</Button>
        </DialogContent>
    </Dialog>
  )
}

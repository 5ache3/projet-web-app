
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Search } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { toast } from 'sonner'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
    closeDialog:()=>void
}
export default function ProjectSearch({isOpen,onClose,closeDialog,handleClick}:promps) {
    const { user } = useUser();
    const [projectId,setProjectId]=useState('');
    const id=user?.id ;

    const joinProject = async ()=>{
        closeDialog();
        
        const data={
            project_id:projectId,
            user_id:id
        }
         try{
            const response = await fetch(`/api/user/${id}/projects`, {
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
                toast.error(`project not found`)
                return
            }
            toast.success("joined ")
        }catch{

        }
    }
    const onSubmit = ()=>{
       joinProject()
    }
    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Search for projects</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-mainbg-2 w-full text-white'>
            <form className='flex flex-col gap-4 ' onSubmit={()=>{onSubmit()}}>
                <div className='project-title-insertion flex flex-col gap-2'>
                    <label>Project ID</label>
                    <input  type='text' 
                    value={projectId}
                    onChange={(event)=>{setProjectId(event.target.value)}}
                    className='bg-white h-13 rounded-xl text-black font-semibold px-4' placeholder='Project id' required/>
                </div>
                <Button className='bg-white text-black font-semibold h-10 mt-5 cursor-pointer hover:bg-amber-100'>Join <Search/>
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}
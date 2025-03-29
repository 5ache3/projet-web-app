
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Search } from 'lucide-react'
interface promps{
    isOpen:boolean
    onClose?:()=>void
    handleClick?:()=>void
}
export default function ProjectSearch({isOpen,onClose,handleClick}:promps) {

    return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>Search for projects</DialogTitle>
        <DialogContent className='flex flex-col p-10 bg-dark-2 w-full text-white'>
            <div className='flex flex-col gap-4 '>
                <div className='project-title-insertion flex flex-col gap-2'>
                    <label>Project ID</label>
                    <input type='text' className='bg-white h-13 rounded-xl text-black font-semibold px-4' placeholder='Project id' required/>
                </div>
                
            </div>
            <Button className='bg-white text-dark-1 font-semibold h-10 mt-5 hover:bg-amber-100'>Search <Search/>
            </Button>
        </DialogContent>
    </Dialog>
  )
}
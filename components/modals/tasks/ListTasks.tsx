import { Check, DotIcon, DotSquareIcon, Pen, Share2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '../../ui/checkbox'
import TasktCompletion from './TaskCompleation'
import { it } from 'node:test'
import TasktActions from './TaskActions'
import { PopoverTrigger,Popover  } from '@/components/ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'

type Task={
    id: string,
    title: string,
    project_id: string,
    description: string,
    created_at: Date,
    completed: boolean
}

export default function ListTasks({tasks}:{tasks:Task[]}) {
    const [clicked,SetClicked]=useState('');
    const [clicked2,SetClicked2]=useState('');
    const [completed_arr,setCompleted_arr]=useState<boolean[]>([])

    const completeItem=(index:number)=>{
        const list=[]
        for(let i=0;i<completed_arr.length;i++){
            if(i===index){
                list.push(!completed_arr[i])
            }else{
                list.push(completed_arr[i])
            }
        }
        setCompleted_arr(list);
    }
    useEffect(()=>{
        setCompleted_arr(tasks.map((item)=>item.completed))

    },[tasks])
  return (
        <div className='bg-white p-4 px-2 text-black scrolable h-50 w-full flex flex-col gap-3 rounded-xl overflow-auto '>
            {tasks.map((item,index) => {
                return (
                    <div><div key={index} className='bg-gray-1 p-4 rounded-lg flex justify-between'>
                        <div className='max-w-50'>
                        {item.title} 
                        </div>
                            <div onClick={()=>{SetClicked2(item.id)}}>
                            <Checkbox checked={completed_arr[index]}/>
                            </div>
                        <div>
                            <Popover>
                                <PopoverTrigger>
                                    <Image className='cursor-pointer'
                                    alt='actions'
                                    src={'/assets/more.svg'}
                                    height={24}
                                    width={24}
                                    />
                                </PopoverTrigger>
                                <PopoverContent className='p-2 flex flex-col gap-3 bg-gray-100 rounded-xl'>
                                    <div className='cursor-pointer p-1 hover:bg-gray-200 hover:text-gray-1 rounded-full'
                                    onClick={()=>{SetClicked(item.id)}}>
                                        <Pen/>
                                    </div>

                                    <div className='cursor-pointer p-1 hover:bg-gray-200 hover:text-gray-1 rounded-full'
                                            onClick={()=>{}}>
                                        <Share2/>
                                    </div>
                                    </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <TasktCompletion
                        isOpen={clicked2===item.id}
                        closeDialog={()=>{SetClicked2('')}}
                        onClose={()=>{SetClicked2('')}}
                        handleSubmit={()=>{completeItem(index)}}
                        task={item}
                        />
                        <TasktActions
                        isOpen={clicked===item.id}
                        closeDialog={()=>{SetClicked('')}}
                        onClose={()=>{SetClicked('')}}
                        task={item}
                        />
                    </div>
                    </div>
                )})}
        </div>
    
  )
}

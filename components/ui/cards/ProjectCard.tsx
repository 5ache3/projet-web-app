import { DotSquare, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CircularProgressCard from './circularProgrssBar'

export default function ProjectCard({title,color,total,completed}:{title:string,color:string,total:number,completed:number}) {
  return (
    <div className={`m-auto px-4 py-6 w-full xl:min-w-[300px] max-w-[350px]  min-h-[200px] 
      rounded-[16px] cursor-pointer flex flex-col justify-between ${color}`}>
      <h1 className='text-white font-semibold text-2xl'>{title}</h1>
        <div className='flex flex-col justify-around w-full'>
          <CircularProgressCard nb_tasks={total} completed_tasks={completed}/>
        </div>
      <div className=' flex justify-center items-center glassmorphism2 size-13 w-full rounded-2xl'>
        <MoreHorizontal
            width={24}
            height={24}
        />
      </div>
    </div>
  )
}

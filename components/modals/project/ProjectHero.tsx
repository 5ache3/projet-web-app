import React, { useState } from 'react'
import ListTasks from '../../reusable/ListTasks'
import { Button } from '../../ui/button'
import { CheckCheckIcon, Pen, Plus, Share2 } from 'lucide-react'
import TasktCreation from '../tasks/TaskCreation'
import ProjectCreation from './ProjectCreation'

type Project={
    p:{
      id:string
      title:string
      owner_id:string
      created_at:Date
      description:string
      deadline:Date
    }
    t:number
    c:number
  }
  type Task={
    id: string,
    title: string,
    project_id: string,
    description: string,
    created_at: Date,
    completed: boolean
  }

export default function ProjectHero({data,tasks}:{data?:Project,tasks:Task[]}) {
    const [addingTask,setAddingTask]=useState(false)
    const [editingProject,setEditingProject]=useState(false)
  return (
    <div className='m-0 p-6 md:px-10 px-4 rounded-xl bg-dark-1  md:m-auto'>
          <div className='m-1 w-full flex justify-between'>
            <div></div>
            <div className='text-gray-1 flex gap-5'>
              <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                     onClick={()=>{setEditingProject(true)}}>
                <Pen/>
              </div>
              <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'>
                <Share2/>
              </div>
              <ProjectCreation
              isOpen={editingProject}
              closeDialog={()=>{setEditingProject(false)}}
              onClose={()=>{setEditingProject(false)}}
              actionType='editing'
              project_id={data?.p.id}
              Title={data?.p.title}
              Description={data?.p.description}
              Deadline={data?.p.deadline}

              />
            </div>
          </div>
          <div className='text-white contain  w-full flex flex-col gap-6' >
            <div className='title'>
              <span className='text-gray-1'>Nom: </span>{data?.p.title}
            </div>
            <div className='flex flex-col '>
              <span className='text-gray-1'>description: </span>
              <div className='mx-4'>
                {data?.p.description}
              </div>
            </div>
            <div className='tasks flex flex-col gap-1'>
              <ListTasks tasks={tasks}/>
              <div className='flex gap-2 justify-around w-full'>
                  <Button className='bg-gray-1 cursor-pointer w-50' onClick={()=>{setAddingTask(true)}}><Plus/></Button>
                  <Button className='bg-gray-1 cursor-pointer w-50'><CheckCheckIcon/></Button>
              </div>
      </div>
          </div>
          <TasktCreation
            isOpen={addingTask}
            onClose={()=>{setAddingTask(false)}}
            closeDialog={()=>{setAddingTask(false)}}
          />
        </div>
  )
}

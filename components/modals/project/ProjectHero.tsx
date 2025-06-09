'use client'
import React, { useEffect, useState } from 'react'
import { LogOut, Pen,Share2, Trash } from 'lucide-react'
import ProjectCreation from './ProjectCreation'
import ListTasks from '../tasks/ListTasks'
import ShareProject from './ShareProject'
import { Popover } from '@/components/ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Image from 'next/image'
import ProjectDeletion from './ProjectDeletion'
import { Project, Task } from '@/constants/types'
import ListUsers from './ListUsers'
import ProjectJoiningPopover from './ProjectJoiningPopover'
import LeaveProject from './LeaveProject'


export default function ProjectHero({data,tasks,u_id}:{data:Project,tasks:Task[],u_id:string}) {
  
    const [editingProject,setEditingProject]=useState(false);
    const [deletingProject,setDeletingProject]=useState(false);
    const [sharingProject,setSharingProject]=useState(false);
    const [leavingProject,setLeavingProject]=useState(false);
    
    const [userRole,setUserRole]=useState('')

    const [isProjectJoined,setIsProjectJoined]=useState(userRole.length>0);
    useEffect(()=>{
      const getUserRole = async ()=>{
        if(!data){
          return
        }
        for(let i=0;i<data.users.length;i++){
          if(data.users[i].user_id.trim()===u_id?.trim()){
            setUserRole(data.users[i].role);
            setIsProjectJoined(userRole.length>0);
            break
          }
        }
      }
      getUserRole();
    },[userRole])
  return (
    <div className='m-0 p-6 md:px-10 px-4 rounded-xl bg-mainbg-1  md:m-auto'>
          <div className='m-1 w-full flex justify-between'>
            <div></div>
            <div className='text-gray-1 flex gap-5'>
              {userRole&&(
              <Popover>
                <PopoverTrigger asChild>
                  <Image className='cursor-pointer'
                    alt='actions'
                    src={'/assets/more.svg'}
                    height={24}
                    width={24}
                    />
                </PopoverTrigger>

                <PopoverContent  className='p-2 flex flex-col gap-3 bg-gray-100 rounded-xl'>
                  <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                        onClick={()=>{setEditingProject(true)}}>
                    <Pen/>
                  </div>
                  <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                          onClick={()=>{setSharingProject(true)}}>
                    <Share2/>
                  </div>
                  {u_id===data.p.owner_id&&(
                  <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                          onClick={()=>{setDeletingProject(true)}}>
                    <Trash/>
                  </div>
                  )}
                  {u_id!==data.p.owner_id&&(
                  <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                          onClick={()=>{setLeavingProject(true)}}>
                    <LogOut/>
                  </div>
                  )}
                </PopoverContent>
              </Popover>
              )}
              <div>
                <ProjectJoiningPopover
                  isOpen={!isProjectJoined}
                  project_id={data.p.id}
                  title={data.p.title}
                  description={data.p.description}
                  onClose={()=>{setIsProjectJoined(true)}}
                />
                <LeaveProject
                isOpen={leavingProject}
                project_id={data.p.id}
                onClose={()=>{setLeavingProject(false)}}
                />
                <ProjectCreation isOpen={editingProject}
                  closeDialog={()=>{setEditingProject(false)}}
                  onClose={()=>{setEditingProject(false)}}
                  actionType='editing'
                  project_id={data?.p.id}
                  Title={data?.p.title}
                  Description={data?.p.description}
                  Deadline={data?.p.deadline}
                />
                <ShareProject
                isOpen={sharingProject}
                onClose={()=>{setSharingProject(false)}}
                id={data?.p.id}
                title={data?.p.title}
                />
                <ProjectDeletion
                isOpen={deletingProject}
                closeDialog={()=>{setDeletingProject(false)}}
                onClose={()=>{setDeletingProject(false)}}
                handleSubmit={()=>{setDeletingProject(false)}}
                p_id={data.p.id}
                />
              </div>

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
            <ListTasks tasks={tasks} role={userRole}/>
            <ListUsers users={data.users} u_id={u_id} u_role={userRole}/>
          </div>
        </div>
  )
}

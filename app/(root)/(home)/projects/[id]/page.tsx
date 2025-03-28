'use client'
import TasktCreation from '@/components/modals/TaskCreation';
import ListTasks from '@/components/reusable/ListTasks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser } from '@clerk/nextjs';
import { set } from 'date-fns';
import { CheckCheckIcon, DotSquareIcon, Pen, Plus, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

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
export default function page() {
  const { user } = useUser();
  const [clicked,setClicked]=useState(false)
  const [isloading,setLoading]=useState(true)
  const user_id = user?.id || 'user_2ur3IAd0kdkdfAd4mC7lREJcYyX';

  const [data,setData]=useState<Project>()
  const [tasks,setTasks]=useState<Task[]>([])
  const params = useParams();
  const id=params.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetch(`/api/projects/${id}`);
        const project = await data?.json()
        setData(project)
        setLoading(false)
      } catch (error) {
        console.error("Error", error);
      }
    };
    const fetchTasks = async ()=>{
      try{
        const data = await fetch(`/api/projects/${id}/tasks`);
        const response = await data.json();
        setTasks(response);
      }catch(error){
        console.error("Error ",error);
      }
    }
    fetchProjects();
    fetchTasks();
  }, [id]);
  if(isloading){
    return (<></>)
  }else{
    return (
      <div className='m-0 p-6 md:px-10 px-4 rounded-xl bg-dark-1  md:m-auto'>
        <div className='m-1 w-full flex justify-between'>
          <div></div>
          <div className='text-gray-1 flex gap-5'>
            <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'>
              <Pen/>
            </div>
            <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'>
              <Share2/>
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
          <div className='tasks flex flex-col gap-1'>
            <ListTasks tasks={tasks}/>
            <div className='flex gap-2 justify-around w-full'>
                <Button className='bg-gray-1 cursor-pointer w-50' onClick={()=>{setClicked(true)}}><Plus/></Button>
                <Button className='bg-gray-1 cursor-pointer w-50'><CheckCheckIcon/></Button>
            </div>
    </div>
        </div>
        <TasktCreation
          isOpen={clicked}
          onClose={()=>{setClicked(false)}}
          closeDialog={()=>{setClicked(false)}}
        />
      </div>
    )
  }
}

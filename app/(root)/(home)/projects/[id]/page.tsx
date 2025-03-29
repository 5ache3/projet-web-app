'use client'
import ProjectHero from '@/components/modals/project/ProjectHero';
import { useUser } from '@clerk/nextjs';
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
  const [isloading,setLoading]=useState(true)
  const { user } = useUser();
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
    return (<>Loading...</>)
  }else{
    return (
      <section>
        <ProjectHero
         data={data}
         tasks={tasks}
         />
      </section>
    )
  }
}

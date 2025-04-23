'use client'
import ProjectHero from '@/components/modals/project/ProjectHero';
import { Project, Task } from '@/constants/types';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function page() {
  const [isloading,setLoading]=useState(true)
  const { user } = useUser();
  const user_id = user?.id;

  const [data,setData]=useState<Project>()
  const [tasks,setTasks]=useState<Task[]>([])
  const params = useParams();
  const id=params.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        const project = await response?.json()
        if(project&&!data){
          setData(project)
          setTasks(project.tasks)
          
        }

        setLoading(false)
      } catch (error) {
        console.error("Error", error);
      }
    };
    

    fetchProjects();
  }, []);

  if(isloading){
    return (<>Loading...</>)
  }else{
    if(data){
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
}

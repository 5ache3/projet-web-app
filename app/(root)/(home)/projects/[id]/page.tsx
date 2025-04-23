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
  const [userRole,setUserRole]=useState('')
  const params = useParams();
  const id=params.id;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetch(`/api/projects/${id}`);
        const project = await data?.json()
        if(project){
          setData(project)
          setTasks(project.tasks)
          for(let i=0;i<project.users.length;i++){
            if(project.users[i].user_id===user_id){
              setUserRole(project.users[i].role)
              break
            }
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error", error);
      }
    };
    const getUserRole = async ()=>{
      if(!data){
        return
      }
      for(let i=0;i<data.users.length;i++){
        if(data.users[i].user_id===user_id){
          setUserRole(data.users[i].role)
          return
        }
      }
    }

    fetchProjects();
  }, [id,user_id]);

  if(isloading){
    return (<>Loading...</>)
  }else{
    if(data){
      return (
        <section>
          <ProjectHero
           data={data}
           tasks={tasks}
           role={userRole}
           />
        </section>
      )
    }
  }
}

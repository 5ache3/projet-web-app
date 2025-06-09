'use client'
import ProjectCard from '@/components/cards/ProjectCard'
import ListProjectSkeletons from '@/components/reusable/ListProjectSkeletons';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
type project={
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
export default function page() {
    const { user } = useUser();
    const [listProjects, setListProjects] = useState<project[]>([]); 
    const [isLoading,setIsloading]=useState(true)
    const cards=['card-1','card-2','card-3','card-4',]
    const id = user?.id  ;
    const router = useRouter()
    
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const data = await fetch(`/api/user/${id}/projects`);
          const projects = await data?.json()
          setListProjects(projects);
          setIsloading(false)
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      fetchProjects();
    }, [id]);
    if(isLoading){
      return (<ListProjectSkeletons nb={3}/>)
    }
  return (
    <div className='text-white'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
            {listProjects.map((item,index) => (
              <ProjectCard 
              key={index}
              title={item.p.title}
              color={cards[index%cards.length]}
              total={item.t}
              completed={item.c}
              date={item.p.deadline}
              handleClick={()=>{router.push(`/projects/${item.p.id}`)}}
              />
              
            ))}
      </div>
    </div>
  )
}

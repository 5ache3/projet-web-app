'use client'
import ProjectCard from '@/components/cards/ProjectCard'
import ListProjectSkeletons from '@/components/reusable/ListProjectSkeletons';
import { Calendar } from '@/components/ui/calendar';
import HomeActions from '@/components/ui/HomeActions'
import { Project } from '@/constants/types';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {

  const { user } = useUser();
  const id = user?.id;
  const [listProjects, setListProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const cards = ['card-1', 'card-2', 'card-3', 'card-4',]
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetch(`/api/user/${id}/projects`);
        const projects = await data?.json()
        if (projects) {
          const lis = []
          for (let i = 0; i < 2 && i < projects.length; i++) {
            lis.push(projects[i])
          }
          setListProjects(lis);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [id]);
  return (
    <section className='w-full bg-red text-white'>
      <HomeActions />
      <div className='p-3 projects bg-mainbg-1  rounded-2xl flex flex-col gap-6 mt-10'>
        <h1 className='text-white px-4 text-3xl font-semibold'>Projects</h1>

        {loading ? (
          // <ListProjectSkeletons nb={2} />
          <></>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
            {listProjects.map((item, index) => (
              <ProjectCard
                key={index}
                title={item.p.title}
                color={cards[index % cards.length]}
                total={item.t}
                completed={item.c}
                date={item.p.deadline}
                handleClick={() => router.push(`/projects/${item.p.id}`)}
              />
            ))}
          </div>
        )}

      </div>
    </section>

  )
}

export default page
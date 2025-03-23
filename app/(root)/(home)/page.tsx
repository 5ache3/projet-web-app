import ProjectCard from '@/components/ui/cards/ProjectCard'
import HomeActions from '@/components/ui/HomeActions'
import React from 'react'

function page() {
  return (
    <section className='w-full bg-red text-white'>
      <HomeActions/>
      <div className='p-3 projects bg-dark-1  rounded-2xl flex flex-col gap-6 mt-10'>
        <h1 className='text-white px-4 text-3xl font-semibold'>Projects</h1>
        
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
          <ProjectCard 
          title='Projet Web'
          color='card-1'
          total={12}
          completed={3}
          />
          <ProjectCard 
          title='Next JS'
          color='card-2'
          total={7}
          completed={6}
          />
        </div>
      </div>
    </section>

  )
}

export default page
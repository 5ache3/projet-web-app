import React from 'react'
import Card from './cards/Card'
import ProjectCard from './cards/ProjectCard'

export default function HomeActions() {
  return (
    <section>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
          <Card 
          title='Create project'
          color='bg-yellow-300'
          img_url='/icons/add.svg'
          />
          <Card 
          title='Join Project'
          color='bg-blue-300'
          img_url='/assets/search.svg'
          />
      </div>
      <div className='p-3 projects bg-dark-1  rounded-2xl flex flex-col gap-6 mt-10'>
        
        <h1 className='text-white px-4 text-3xl font-semibold'>Projects</h1>
        
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
          <ProjectCard 
          title='Projet Web'
          color='bg-yellow-300'
          total={12}
          completed={3}
          />
          <ProjectCard 
          title='Next JS'
          color='bg-blue-300'
          total={7}
          completed={6}
          />
        </div>
      </div>
    </section>
  )
}

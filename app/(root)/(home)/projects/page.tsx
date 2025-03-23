import ProjectCard from '@/components/ui/cards/ProjectCard'
import React from 'react'

export default function page() {
  return (
    <div className='text-white'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
                <ProjectCard 
                title='Projet Web'
                color='card-1'
                total={12}
                completed={3}
                />
                <ProjectCard 
                title='Next JS'
                color='card-4'
                total={7}
                completed={6}
                />
                <ProjectCard 
                title='prog mobile'
                color='card-2'
                total={8}
                completed={6}
                />
                <ProjectCard 
                title='Next JS'
                color='card-3'
                total={12}
                completed={9}
                />
              </div>
    </div>
  )
}

import React from 'react'
import Card from './cards/Card'

export default function HomeActions() {
  return (
    <div>
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
    </div>
  )
}

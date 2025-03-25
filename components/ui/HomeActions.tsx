import React from 'react'
import Card from './cards/Card'

export default function HomeActions() {
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2  xl:grid-cols-3'>
          <Card 
          title='Create project'
          color='card-2'
          img_url='/icons/add.svg'
          />
          <Card 
          title='Join Project'
          color='card-1'
          img_url='/assets/search.svg'
          />
      </div>
    </div>
  )
}

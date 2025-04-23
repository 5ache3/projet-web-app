import React, { useEffect, useState } from 'react'
import { User, User_Project } from '@prisma/client';
export default function ListUsers({users}:{users:User_Project[]}) {
    const [usersData,setUsers]=useState<User[]>([]);

    useEffect(()=>{
        const fetchUsers =()=>{
            users.forEach(async (user)=>{
                try {
                    const data = await fetch(`/api/user/${user.user_id}`);
                    const userDate = await data?.json();
                    if(userDate){
                        setUsers([...usersData,userDate]);
                    }
                  } catch (error) {
                    console.error("Error fetching projects:", error);
                  }
            })
        }
        fetchUsers()
    },[])
  return (
    <div>{usersData.map((user)=>{
        return (<div key={user.id} className='hidden'>{user.image_url}</div>)
    })}</div>
  )
}

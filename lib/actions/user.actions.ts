import { use } from 'react'
import prisma from '../prisma'
interface UserType {
    id: string;
    name: string;
    username: string|null;
    email: string|null;
    image_url: string;
  }
  

export async function createUser({data}:{data:UserType}) {
    try{
        console.log(data)
        const user=await prisma.user.create({data})
        console.log(user);
        
        return user
    }catch(error){
        console.log(error)
    }
}
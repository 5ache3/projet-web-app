import { User_Project } from "@prisma/client"



type Project={
  id:string
  title:string
  ownerId:string
  createdAt:Date
  description:string
  deadline:Date
  t:number
  c:number
  tasks:Task[]
  members:User[]
}

type User={
  role:string
      id:string,
      name:string,
      username:string
      imageUrl:string
}
type Task={
    id: string,
    title: string,
    project_id: string,
    description: string,
    created_at: Date,
    completed: boolean
  }
export type {Project,Task,User}
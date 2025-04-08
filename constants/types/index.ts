type Project={
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
    tasks:Task[]
    users:{
      id: string
      user_id: string
      project_id: string
      role: string
    }[]
}

type Task={
    id: string,
    title: string,
    project_id: string,
    description: string,
    created_at: Date,
    completed: boolean
  }
export type {Project,Task}
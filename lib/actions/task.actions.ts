import { Task } from '@prisma/client';
import prisma from '../prisma'


export async function createTask({data}:{ data: Omit<Task, 'id' | 'created_at'> }) {
    try{
        const task = await prisma.task.create({data});
        return task
    }catch(error){
        console.log(error)
    }
}
export async function getTasks({project_id}:{project_id:string}) {
    try{
        const tasks = await prisma.task.findMany({
            where:{project_id}
        });
        return tasks
    }catch(error){
        console.log(error)
    }
}
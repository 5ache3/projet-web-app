import prisma from '../prisma'
import {Projet} from '@prisma/client'


export async function createProject({data}:{ data: Omit<Projet, 'id' | 'created_at'> }) {
    try{

        const project=await prisma.projet.create({data});
        const relation = await prisma.user_Project.create({
            data:{
                project_id :project.id,
                user_id:data.owner_id,
                role :'creator'
            }
        })
        console.log(relation)
        return [project,relation]
    }catch(error){
        console.log(error)
    }
}

export async function deleteProject({id}:{id:string}) {
    try{
        const project=await prisma.projet.delete({
            where:{id}
        })
        return project
    }catch(error){
        console.log(error)
    }
}
export async function getProject({id}:{id:string}) {
    try{
        const project=await prisma.projet.findFirst({
            where:{id}
        })
        const count_tot=await prisma.task.findMany({
            where: {project_id:id}
        })
        const count_comp=await prisma.task.findMany({
            where: {project_id:id,completed:true}
        })

        return {p:project,t:count_tot,c:count_comp}
    }catch(error){
        console.log(error)
    }
}


export async function updateProject(id:string,data:Partial<Projet>) {
    try{
        const project=await prisma.projet.update({
            where:{id},data
        })
        return project
    }catch(error){
        console.log(error)
    }
}
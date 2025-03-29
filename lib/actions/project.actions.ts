import prisma from '../prisma'
import {Projet} from '@prisma/client'

type id_p={
    project_id:string
}
export async function createRelation(u_id:string,p_id:string){
    const relation = await prisma.user_Project.create({
            data:{
                project_id :p_id,
                user_id:u_id,
                role :'creator'
            }
        })
}
export async function createProject({data}:{ data: Omit<Projet, 'id' | 'created_at'> }) {
    try{
        const project=await prisma.projet.create({data});
        return project
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

        return {p:project,t:count_tot.length,c:count_comp.length}
    }catch(error){
        console.log(error)
    }
}

async function GetProjects(list:id_p[]) {
    const projects = [];
  
    for (let i = 0; i < list.length; i++) {
        const projet = await getProject({ id: list[i].project_id });
        projects.push(projet);
    }
  
    return projects;
}

export async function GetListProjects(user_id:string) {
    try{
        const list=await prisma.user_Project.findMany({
            where:{user_id},
            select:{project_id:true}
        })
        return GetProjects(list)
    }catch(error){
        console.log(error)
    }
}


export async function updateProject({data,id}:{data:Omit<Projet,'created_at'|'id'>,id:string}) {
    try{
        const project=await prisma.projet.update({
            data:data,
            where:{id}
        })
        return project
    }catch(error){
        console.log(error)
    }
}
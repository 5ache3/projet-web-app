import { createRelation, findProject, findRelation, GetListProjects, getProject } from "@/lib/actions/project.actions";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {id} = await params;
        const data = await GetListProjects(id);
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try{
        const { project_id,user_id}= await req.json();
        const project= await findProject({id:project_id});

        if(project.length===0){
            return NextResponse.json({error:'No project Found'},{status:404})
        }
        const relation = await findRelation({u_id:user_id,p_id:project_id})
        if(relation.length>0){
            return NextResponse.json({error:'exist'},{status:403})
        }else{
            const data = createRelation({u_id:user_id,p_id:project_id,role:"regular"})
            return NextResponse.json(data);
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

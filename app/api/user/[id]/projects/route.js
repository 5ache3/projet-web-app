import { GetListProjects } from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try{
        const {id} = await params;
        const data = await GetListProjects(id);
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createConnection } from "@/lib/db/connection";
import { createRelation } from "@/lib/actions/project.actions";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { title, description, deadline, owner_id } = await req.json();
        
        const newProject = await prisma.projet.create({
            data: {
                title,
                description: description || null,
                deadline: deadline ? new Date(deadline) : null,
                owner_id,
            },
        });
        const project_id=newProject.id;
        
        const query=`INSERT INTO user_project (user_id, project_id,role) VALUES (?,?, 'creator');`;
        // const [response]= await db.query(query,[owner_id,newProject.id]);
        const response =createRelation(owner_id,project_id);
        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}


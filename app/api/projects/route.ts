import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

        return NextResponse.json(newProject, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

import {getProjectNotiffs, sendNotifications} from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {user_id,p_id} = await params;
        const data = await getProjectNotiffs({u_id:user_id,p_id})
        return NextResponse.json(data);
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
export async function POST(req: Request,{ params }:{ params: { [key: string]: string } }) {
    try{
        const {user_id,p_id} = await params;
        const {message,destinataireId} = await req.json();
        const data={message: message,
                destinataireId: destinataireId,
                proprietaireId: user_id, // optional
                projetId: p_id, // optional}
        }
        const response = await sendNotifications({data});

        return NextResponse.json(response);
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
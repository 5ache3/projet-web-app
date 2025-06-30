"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent, use, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useSession } from "@/app/session.context";
import { set } from "date-fns";
import { User } from "@/constants/types";

interface FormData {
  username: string;
  name: string;
  imageUrl: string; 
}

export default function page() {
  const session=useSession();
  const userId=session.userId;
  const [username,setUsername]=useState('')
  const [name,setName]=useState('')
  const [image_url,setImage_url]=useState('')

  useEffect(()=>{
    const fetchProfile= async ()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${userId}/info`);
      const data:User= await response.json();
      if(data){
        setUsername(data.username);
        setName(data.name);
        setImage_url(data.imageUrl);
      }
    }
    if(userId)
    fetchProfile()
  },[userId])

  return (
    <div className="bg-mainbg-1 w-full h-full">
      
    </div>
  )
}

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getSession } from '@/lib/session';

export default async function SignedInUser() {
  const session = await getSession();
  const u_id = session?.userId;

  if (!u_id) {
    return null; 
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/user/${u_id}/info`);
  const user = await response.json();

  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username.trim()[0]}`} />
      <AvatarFallback>{user.username}</AvatarFallback>
    </Avatar>
  );
}


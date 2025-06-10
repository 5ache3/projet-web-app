'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, User_Project } from '@prisma/client';
import MembersList from '@/components/lists/MembersList';

export default function ListUsers({ users ,u_id,u_role,p_id}: { users: User_Project[] ,u_id:string,u_role?:string,p_id:string}) {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [listOpened,openList]=useState(false)
  useEffect(() => {
    const fetchUsers = async () => {
      const results = await Promise.all(
        users.map(async (user) => {
          try {
            const res = await fetch(`/api/user/${user.user_id}`);
            return await res.json();
          } catch (e) {
            console.error('Error fetching user:', e);
            return null;
          }
        })
      );
      const validUsers = results.filter(Boolean) as User[];
      setUsersData(validUsers);
    };

    fetchUsers();
  }, [users]);

  return (
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
      {usersData.slice(0, 3).map((user) => (
        <Avatar key={user.id}>
          <AvatarImage
            src={
              user.image_url ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.name.trim()[0]}`
            }
          />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      ))}
      {(usersData&&usersData.length>0)&&(
      <Avatar className="relative cursor-pointer" onClick={()=>{openList(true)}}>
        <AvatarImage
          src="/icons/add.svg"
          className="w-full h-full object-cover"
        />
        <AvatarFallback>more</AvatarFallback>
      </Avatar>

      )}
      <MembersList 
      isOpen={listOpened}
      onClose={()=>{openList(false)}}
      users={usersData}
      u_id={u_id}
      u_role={u_role}
      p_id={p_id}
      />
    </div>
  );
}

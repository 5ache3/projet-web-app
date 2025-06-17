import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { RequestStatus, User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
type Info={
    name?:string
    username:string
    image:string
}
export default function RequestNotifCard({ id, lue, projectName, message, title, dateEnvoi,sender_id,state,u_id,p_id}: { id: string, lue: boolean, projectName: string | null, message: string, title: string, dateEnvoi: Date,sender_id:string,state:RequestStatus|null,u_id:string,p_id:string,}) {
    const [senderInfo,setSenderInfo]=useState<User>()
    const [notifState,setNotifState]=useState(state)
    const [viewed,setViewed]=useState(lue)
    const deleteNotification = async (notifId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: notifId }),
            });
            if (!response.ok) {
                toast.error('Failed to delete notification');
                throw new Error('Failed to delete notification');
            }
            
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };
    useEffect(()=>{
        const getsenderInfo = async ()=>{
            try {
                const response = await fetch(`http://localhost:3000/api/user/${sender_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setSenderInfo(data);
            } catch (err) {
                console.error(err);
            }
        }
        getsenderInfo();
    },[])

    const aproveRequest = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/${id}/aprouve/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id,u_id:sender_id,p_id}),
            });
            if (!response.ok) {
                toast.error('Failed to delete notification');
                throw new Error('Failed to delete notification');
            }
            if(response.ok){
                const message_response = await fetch(`/api/notifications/user/${u_id}/${p_id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            },
                        body: JSON.stringify({ message: '', destinataireId: sender_id, title: `you have been aproved`}),
                    });
                if (!message_response.ok) {
                toast.error(`error`)
                return
                }
            }
        setNotifState('APPROVED')
        setViewed(true)
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }
    const rejectRequest = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/notifications/${id}/reject/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id:  id}),
            });
            if (!response.ok) {
                toast.error('Failed to delete notification');
                throw new Error('Failed to delete notification');
            }
            if(response.ok){
                const message_response = await fetch(`/api/notifications/user/${u_id}/${p_id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            },
                        body: JSON.stringify({ message: '', destinataireId: sender_id, title: `you have been rejected`}),
                    });
                if (!message_response.ok) {
                toast.error(`error`)
                return
                }
            }
        setNotifState('REJECTED')
        setViewed(true)
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }
  return (
    <div >
        {senderInfo&&(
            <div className={`flex flex-col p-4 mb-2 rounded-lg ${viewed ? 'bg-gray-300' : 'bg-blue-300'}`}>
                <div className={`flex items-center justify-between`}>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                            {senderInfo.image_url?(
                                <Avatar className='w-12 h-12'>
                                    <AvatarImage src={senderInfo.image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${senderInfo.name.trim()[0]}`} />
                                    <AvatarFallback>{senderInfo.username}</AvatarFallback>
                                </Avatar>
                            )
                            :(
                                <span className="text-lg font-bold">{senderInfo.username?.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                <span className='text-black'>{senderInfo.username}:</span>
                                <span className='text-sm text-gray-600 ml-2'>{title}</span>
                                <span className='ml-2 text-md  text-gray-700'>{projectName}</span>
                            </h3>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-2 align-end'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Image className='cursor-pointer'
                                    alt='actions'
                                    src={'/assets/more.svg'}
                                    height={24}
                                    width={24}
                                />
                            </PopoverTrigger>

                            <PopoverContent className='flex flex-col gap-3 w-15 bg-gray-100 rounded-xl'>

                                {
                                    <div className='cursor-pointer p-1 hover:bg-gray-1 hover:text-white rounded-full'
                                        onClick={() => { deleteNotification(id); /* Replace with actual notification ID */ }}>
                                        <Trash />
                                    </div>

                                }

                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                {notifState=='PENDING'&&(
                    <div className='flex gap-2 m-auto'>
                        <div onClick={aproveRequest} className='p-2 rounded-2xl w-20 text-center bg-green-400 cursor-pointer font-semibold'>Aprove</div>
                        <div onClick={rejectRequest} className='p-2 rounded-2xl w-20 text-center bg-red-400 cursor-pointer font-semibold'>Reject</div>
                    </div>
                )}
                {notifState=='REJECTED'&&(
                    <div className='flex gap-2 m-auto'>
                        <div className='p-2 rounded-2xl w-30 text-center bg-red-300 cursor-pointer font-semibold'>Rejected</div>
                    </div>
                )}
                {notifState=='APPROVED'&&(
                    <div className='flex gap-2 m-auto'>
                        <div className='p-2 rounded-2xl w-30 text-center bg-green-300 cursor-pointer font-semibold'>Aproved</div>
                    </div>
                )}
                <span className="text-xs text-gray-500">{new Date(dateEnvoi).toLocaleDateString()} {new Date(dateEnvoi).toLocaleTimeString()}</span>
            </div>
        )}
    </div>
  )
}

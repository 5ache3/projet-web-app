import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import NotificationCard from '../cards/NotificationCard';
import { Notification, RequestStatus } from '@prisma/client';

export default function RequestedJoin({isOpen,onClose,u_id,p_id,title}:{isOpen:boolean,onClose:()=>void,u_id:string,p_id:string,title:string}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const deleteFromList= (index:number)=>{
        const list=[]
        for(let i=0;i<notifications.length;i++){
            if(i===index){
                continue
            }else{
                list.push(notifications[i])
            }
        }
        setNotifications(list);
    }
    const changeitemList= (index:number,new_t:RequestStatus)=>{
        const list=[]
        for(let i=0;i<notifications.length;i++){
            if(i===index){
                let item=notifications[i]
                item.lue=true
                item.requestStatus=new_t
            }else{
                list.push(notifications[i])
            }
        }
        setNotifications(list);
    }
        useEffect(() => {
            async function fetchNotifications() {
                try {
                    const response = await fetch(`http://localhost:3000/api/notifications/user/${u_id}/${p_id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch notifications');
                    }
                    const data: Notification[] = await response.json();
                    setNotifications(data);
                } catch (err) {
                    console.error(err);
                }
            }
    
            fetchNotifications();
        }, [u_id]);
  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className='hidden'>leaving project</DialogTitle>
        <DialogContent className='flex flex-col p-10 px-10 bg-mainbg-2 w-full text-white h-150 overflow-auto'>
            {notifications.map((notif: Notification,index:number) => (
                <NotificationCard key={notif.id} notif={notif} project={title} index={index} deletion={deleteFromList} changed={changeitemList}/>
            ))}
        </DialogContent>
    </Dialog>
  )
}

'use client'
import { useEffect, useState } from 'react';
import NotificationCard from '../cards/NotificationCard';
import { NotificationType } from '@/constants/types';


export default function NotifficationsList({ u_id }: { u_id: string }) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_2}/api/notifications/user/${u_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data: NotificationType[] = await response.json();
                setNotifications(data);
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchNotifications();
    }, [u_id]);

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {notifications.map((notif: NotificationType) => (
                <NotificationCard key={notif.id} notif={notif} />
            ))}
        </>
    );
}

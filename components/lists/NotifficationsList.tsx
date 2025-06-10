'use client'
import { useEffect, useState } from 'react';
import NotificationCard from '../cards/NotificationCard';
import { Notification } from '@prisma/client';


export default function NotifficationsList({ u_id }: { u_id: string }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch(`http://localhost:3000/api/notifications/${u_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data: Notification[] = await response.json();
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
            {notifications.map((notif: Notification) => (
                <NotificationCard key={notif.id} notif={notif} />
            ))}
        </>
    );
}

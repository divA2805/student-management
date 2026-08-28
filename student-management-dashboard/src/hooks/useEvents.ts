"use client";

import { useCallback, useEffect, useState } from "react";

import {
    createEvent,
    deleteEvent,
    getEventById,
    getEvents,
    updateEvent,
} from "@/services/eventService";

import { Event, EventInput } from "@/types/event";

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getEvents();

            setEvents(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load events."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const getEvent = useCallback(
    async (id: number): Promise<Event | undefined> => {
        return await getEventById(id);
    },
    []
);

    const addEvent = async (
        data: EventInput
    ): Promise<Event> => {
        const newEvent = await createEvent(data);

        setEvents((prev) => [...prev, newEvent]);

        return newEvent;
    };

    const editEvent = async (
        id: number,
        data: EventInput
    ): Promise<Event> => {
        const updatedEvent = await updateEvent(id, data);

        setEvents((prev) =>
            prev.map((event) =>
                event.id === id
                    ? updatedEvent
                    : event
            )
        );

        return updatedEvent;
    };

    const removeEvent = async (
        id: number
    ): Promise<void> => {
        await deleteEvent(id);

        setEvents((prev) =>
            prev.filter(
                (event) => event.id !== id
            )
        );
    };

    return {
        events,
        loading,
        error,
        loadEvents,
        getEvent,
        addEvent,
        editEvent,
        removeEvent,
    };
}
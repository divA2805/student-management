"use client";

import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import EventForm from "@/modules/events/EventForm/EventForm";
import Loading from "@/components/Loading/Loading";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/event";

export default function EditEventPage() {
    const params = useParams();
    const router = useRouter();

    const { getEvent } = useEvents();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadEvent() {
            try {
                const id = Number(params.id);

                if (Number.isNaN(id)) {
                    setError("Invalid event.");
                    return;
                }

                const data = await getEvent(id);

                if (data) {
                    setEvent(data);
                } else {
                    setEvent(null);
                }
            } catch {
                setError("Unable to load event.");
            } finally {
                setLoading(false);
            }
        }

        loadEvent();
    }, [params.id, getEvent]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Unable to load event
                </h2>

                <p className="card-subtitle">
                    {error}
                </p>

                <Button
                    variant="contained"
                    onClick={() => router.push("/events")}
                    sx={{ textTransform: "none" }}
                >
                    Back to Events
                </Button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Event not found
                </h2>

                <p className="card-subtitle">
                    The requested event could not be found.
                </p>

                <Button
                    variant="contained"
                    onClick={() => router.push("/events")}
                    sx={{ textTransform: "none" }}
                >
                    Back to Events
                </Button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Edit Event
                    </h1>

                    <p className="page-subtitle">
                        Update event information.
                    </p>
                </div>
            </div>

            <EventForm
                mode="edit"
                eventId={event.id}
                initialValues={{
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    organizer: event.organizer,
                    category: event.category,
                }}
            />
        </div>
    );
}
"use client";

import { useRouter } from "next/navigation";

import Loading from "@/components/Loading/Loading";
import EventCard from "@/modules/events/EventCard/EventCard";
import { useEvents } from "@/hooks/useEvents";

export default function StudentEvents() {
    const router = useRouter();

    const {
        events,
        loading,
        error,
        loadEvents,
    } = useEvents();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Unable to load events.
                </h2>

                <button
                    className="retry-button"
                    onClick={loadEvents}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Events
                    </h1>

                    <p className="page-subtitle">
                        View upcoming events and activities.
                    </p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="empty-state">
                    <h2 className="empty-state-title">
                        No events available
                    </h2>

                    <p className="empty-state-subtitle">
                        There are currently no events to display.
                    </p>
                </div>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onView={(event) =>
                                router.push(
                                    `/student/events/${event.id}`
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
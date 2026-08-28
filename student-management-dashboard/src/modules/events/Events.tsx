"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import EventCard from "@/modules/events/EventCard/EventCard";
import Loading from "@/components/Loading/Loading";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/event";

export default function Events() {
    const router = useRouter();

    const {
        events,
        loading,
        error,
        loadEvents,
        removeEvent,
    } = useEvents();

    const [eventToDelete, setEventToDelete] =
        useState<Event | null>(null);

    const [deleteError, setDeleteError] =
        useState<string | null>(null);

    async function handleDelete() {
        if (!eventToDelete) {
            return;
        }

        try {
            setDeleteError(null);

            await removeEvent(eventToDelete.id);

            setEventToDelete(null);
        } catch {
            setDeleteError(
                "Unable to delete event. Please try again."
            );
        }
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Unable to load events.
                </h2>

                <Button
                    variant="contained"
                    onClick={loadEvents}
                    sx={{ textTransform: "none" }}
                >
                    Retry
                </Button>
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
                        Manage upcoming events and activities.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push("/events/add")
                        }
                        sx={{ textTransform: "none" }}
                    >
                        Create Event
                    </Button>
                </div>
            </div>

            {deleteError && (
                <div className="card">
                    <p className="login-error">
                        {deleteError}
                    </p>
                </div>
            )}

            {events.length === 0 ? (
                <div className="empty-state">
                    <h2 className="empty-state-title">
                        No events found
                    </h2>

                    <p className="empty-state-subtitle">
                        Create your first event to get started.
                    </p>

                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push("/events/add")
                        }
                        sx={{ textTransform: "none" }}
                    >
                        Create Event
                    </Button>
                </div>
            ) : (
                <div className="events-grid">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onView={(event) =>
                                router.push(
                                    `/events/${event.id}`
                                )
                            }
                            onEdit={(event) =>
                                router.push(
                                    `/events/${event.id}/edit`
                                )
                            }
                            onDelete={(event) =>
                                setEventToDelete(event)
                            }
                        />
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={Boolean(eventToDelete)}
                title="Delete Event"
                message={
                    eventToDelete
                        ? `Are you sure you want to delete "${eventToDelete.title}"?`
                        : ""
                }
                onCancel={() =>
                    setEventToDelete(null)
                }
                onConfirm={handleDelete}
            />
        </div>
    );
}
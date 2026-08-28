"use client";

import { Button } from "@mui/material";
import { Event } from "@/types/event";

interface EventCardProps {
    event: Event;
    onView?: (event: Event) => void;
    onEdit?: (event: Event) => void;
    onDelete?: (event: Event) => void;
}

export default function EventCard({
    event,
    onView,
    onEdit,
    onDelete,
}: EventCardProps) {
    return (
        <div className="event-card">
            <h2 className="event-card-title">
                {event.title}
            </h2>

            {event.category && (
                <span className="event-card-category">
                    {event.category}
                </span>
            )}

            <p className="event-card-description">
                {event.description}
            </p>

            <div className="event-card-meta">
                <p>
                    📅 {event.date}
                </p>

                <p>
                    🕐 {event.time}
                </p>

                <p>
                    📍 {event.location}
                </p>

                <p>
                    👤 {event.organizer}
                </p>
            </div>

            <div className="event-card-actions">
                {onView && (
                    <Button
                        variant="outlined"
                        onClick={() => onView(event)}
                        sx={{ textTransform: "none" }}
                    >
                        View
                    </Button>
                )}

                {onEdit && (
                    <Button
                        variant="outlined"
                        onClick={() => onEdit(event)}
                        sx={{ textTransform: "none" }}
                    >
                        Edit
                    </Button>
                )}

                {onDelete && (
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={() => onDelete(event)}
                        sx={{ textTransform: "none" }}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
}
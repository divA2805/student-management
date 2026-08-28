import { Event, EventInput } from "@/types/event";

const key = "events";

export async function getEvents(): Promise<Event[]> {
    const savedEvents = localStorage.getItem(key);

    if (!savedEvents) {
        return [];
    }

    try {
        return JSON.parse(savedEvents) as Event[];
    } catch {
        throw new Error("Unable to load events.");
    }
}

export async function getEventById(
    id: number
): Promise<Event | undefined> {
    const events = await getEvents();

    return events.find((event) => event.id === id);
}

export async function createEvent(
    data: EventInput
): Promise<Event> {
    const events = await getEvents();

    const newEvent: Event = {
        id: Date.now(),
        ...data,
    };

    events.push(newEvent);

    localStorage.setItem(
        key,
        JSON.stringify(events)
    );

    return newEvent;
}

export async function updateEvent(
    id: number,
    data: EventInput
): Promise<Event> {
    const events = await getEvents();

    const index = events.findIndex(
        (event) => event.id === id
    );

    if (index === -1) {
        throw new Error("Event not found.");
    }

    const updatedEvent: Event = {
        id,
        ...data,
    };

    events[index] = updatedEvent;

    localStorage.setItem(
        key,
        JSON.stringify(events)
    );

    return updatedEvent;
}

export async function deleteEvent(
    id: number
): Promise<void> {
    const events = await getEvents();

    const remainingEvents = events.filter(
        (event) => event.id !== id
    );

    localStorage.setItem(
        key,
        JSON.stringify(remainingEvents)
    );
}
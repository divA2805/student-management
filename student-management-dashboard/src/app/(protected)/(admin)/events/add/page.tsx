import EventForm from "@/modules/events/EventForm/EventForm";

export default function AddEventPage() {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Create Event
                    </h1>

                    <p className="page-subtitle">
                        Create a new event for students.
                    </p>
                </div>
            </div>

            <EventForm />
        </div>
    );
}
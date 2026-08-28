// "use client";

// import { Button } from "@mui/material";
// import { useRouter } from "next/navigation";

// import { Event } from "@/types/event";

// interface EventDetailsProps {
//     event: Event;
// }

// export default function EventDetails({
//     event,
// }: EventDetailsProps) {
//     const router = useRouter();

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">
//                         {event.title}
//                     </h1>

//                     <p className="page-subtitle">
//                         Event details and information.
//                     </p>
//                 </div>

//                 <div className="page-actions">
//                     <Button
//                         variant="outlined"
//                         onClick={() => router.push("/events")}
//                         sx={{ textTransform: "none" }}
//                     >
//                         Back
//                     </Button>

//                     <Button
//                         variant="contained"
//                         onClick={() =>
//                             router.push(
//                                 `/events/${event.id}/edit`
//                             )
//                         }
//                         sx={{ textTransform: "none" }}
//                     >
//                         Edit Event
//                     </Button>
//                 </div>
//             </div>

//             <div className="card">
//                 <div className="detail-grid">
//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Title
//                         </span>

//                         <span className="detail-value">
//                             {event.title}
//                         </span>
//                     </div>

//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Category
//                         </span>

//                         <span className="detail-value">
//                             {event.category}
//                         </span>
//                     </div>

//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Date
//                         </span>

//                         <span className="detail-value">
//                             {event.date}
//                         </span>
//                     </div>

//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Time
//                         </span>

//                         <span className="detail-value">
//                             {event.time}
//                         </span>
//                     </div>

//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Location
//                         </span>

//                         <span className="detail-value">
//                             {event.location}
//                         </span>
//                     </div>

//                     <div className="detail-item">
//                         <span className="detail-label">
//                             Organizer
//                         </span>

//                         <span className="detail-value">
//                             {event.organizer}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="confirmation-card">
//                     <h2 className="confirmation-title">
//                         Description
//                     </h2>

//                     <p className="confirmation-item">
//                         {event.description}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { Event } from "@/types/event";

interface EventDetailsProps {
    event: Event;
    isAdmin?: boolean;
}

export default function EventDetails({
    event,
    isAdmin = false,
}: EventDetailsProps) {
    const router = useRouter();

    const backPath = isAdmin
        ? "/events"
        : "/student/events";

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        {event.title}
                    </h1>

                    <p className="page-subtitle">
                        Event information.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.push(backPath)
                        }
                        sx={{ textTransform: "none" }}
                    >
                        Back
                    </Button>

                    {isAdmin && (
                        <Button
                            variant="contained"
                            onClick={() =>
                                router.push(
                                    `/events/${event.id}/edit`
                                )
                            }
                            sx={{
                                textTransform: "none",
                            }}
                        >
                            Edit Event
                        </Button>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">
                            Title
                        </span>
                        <span className="detail-value">
                            {event.title}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Category
                        </span>
                        <span className="detail-value">
                            {event.category}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Date
                        </span>
                        <span className="detail-value">
                            {event.date}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Time
                        </span>
                        <span className="detail-value">
                            {event.time}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Location
                        </span>
                        <span className="detail-value">
                            {event.location}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Organizer
                        </span>
                        <span className="detail-value">
                            {event.organizer}
                        </span>
                    </div>
                </div>

                <div className="confirmation-card">
                    <h2 className="confirmation-title">
                        Description
                    </h2>

                    <p className="confirmation-item">
                        {event.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
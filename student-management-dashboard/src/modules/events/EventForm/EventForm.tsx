"use client";

import { Button, MenuItem, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { EventInput } from "@/types/event";
import { useEvents } from "@/hooks/useEvents";

interface EventFormProps {
    initialValues?: EventInput;
    mode?: "create" | "edit";
    eventId?: number;
}

const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required("Title is required"),

    description: Yup.string()
        .trim()
        .required("Description is required"),

    date: Yup.string()
        .required("Date is required"),

    time: Yup.string()
        .required("Time is required"),

    location: Yup.string()
        .trim()
        .required("Location is required"),

    organizer: Yup.string()
        .trim()
        .required("Organizer is required"),

    category: Yup.string()
        .required("Category is required"),
});

const defaultValues: EventInput = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    category: "",
};

export default function EventForm({
    initialValues = defaultValues,
    mode = "create",
    eventId,
}: EventFormProps) {
    const router = useRouter();

    const {
        addEvent,
        editEvent,
    } = useEvents();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    if (mode === "create") {
                        await addEvent(values);
                    } else if (eventId !== undefined) {
                        await editEvent(eventId, values);
                    }

                    router.push("/events");
                } catch (error) {
                    console.error(error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => (
                <Form>
                    <div className="card">
                        <h2 className="card-title">
                            {mode === "create"
                                ? "Create Event"
                                : "Edit Event"}
                        </h2>

                        <p className="card-subtitle">
                            {mode === "create"
                                ? "Add a new event."
                                : "Update event details."}
                        </p>

                        <div className="form-grid">
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.title &&
                                    Boolean(errors.title)
                                }
                                helperText={
                                    touched.title &&
                                    errors.title
                                }
                            />

                            <TextField
                                fullWidth
                                label="Category"
                                name="category"
                                select
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.category &&
                                    Boolean(errors.category)
                                }
                                helperText={
                                    touched.category &&
                                    errors.category
                                }
                            >
                                <MenuItem value="Workshop">
                                    Workshop
                                </MenuItem>
                                <MenuItem value="Seminar">
                                    Seminar
                                </MenuItem>
                                <MenuItem value="Meeting">
                                    Meeting
                                </MenuItem>
                                <MenuItem value="Hackathon">
                                    Hackathon
                                </MenuItem>
                                <MenuItem value="Other">
                                    Other
                                </MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                label="Date"
                                name="date"
                                type="date"
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.date &&
                                    Boolean(errors.date)
                                }
                                helperText={
                                    touched.date &&
                                    errors.date
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Time"
                                name="time"
                                type="time"
                                value={values.time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.time &&
                                    Boolean(errors.time)
                                }
                                helperText={
                                    touched.time &&
                                    errors.time
                                }
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={values.location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.location &&
                                    Boolean(errors.location)
                                }
                                helperText={
                                    touched.location &&
                                    errors.location
                                }
                            />

                            <TextField
                                fullWidth
                                label="Organizer"
                                name="organizer"
                                value={values.organizer}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                    touched.organizer &&
                                    Boolean(errors.organizer)
                                }
                                helperText={
                                    touched.organizer &&
                                    errors.organizer
                                }
                            />
                        </div>

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                                touched.description &&
                                Boolean(errors.description)
                            }
                            helperText={
                                touched.description &&
                                errors.description
                            }
                            sx={{ mt: 2 }}
                        />

                        <div className="form-navigation">
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/events")}
                                disabled={isSubmitting}
                                sx={{ textTransform: "none" }}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{ textTransform: "none" }}
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : mode === "create"
                                    ? "Create Event"
                                    : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
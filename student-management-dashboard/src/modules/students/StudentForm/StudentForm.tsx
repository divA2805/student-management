"use client";

import { useState } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
} from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";

import { StudentInput } from "@/types/student";

const steps = [
    "Personal Information",
    "Course Information",
    "Performance & Confirmation",
];

interface StudentFormProps {
    initialValues: StudentInput;
    onSubmit: (values: StudentInput) => Promise<void>;
}

const personalSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
        .required("Phone is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
});

const courseSchema = Yup.object({
    course: Yup.string().required("Course is required"),
    batch: Yup.string().required("Batch is required"),
    startDate: Yup.string().required("Start date is required"),
    trainer: Yup.string().required("Trainer is required"),
    experience: Yup.string().required("Experience is required"),
});

const performanceSchema = Yup.object({
    status: Yup.string()
        .oneOf(["Active", "Completed", "Inactive"])
        .required("Status is required"),

    score: Yup.number()
        .typeError("Score must be a number")
        .min(0, "Score cannot be below 0")
        .max(100, "Score cannot exceed 100")
        .required("Score is required"),

    pendingAssignments: Yup.number()
        .typeError("Must be a number")
        .integer("Must be a whole number")
        .min(0, "Cannot be negative")
        .required("Pending assignments is required"),
});

export default function StudentForm({
    initialValues,
    onSubmit,
}: StudentFormProps) {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={
                activeStep === 0
                    ? personalSchema
                    : activeStep === 1
                    ? courseSchema
                    : performanceSchema
            }
            onSubmit={onSubmit}
        >
            {(formik) => {
                const {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    validateForm,
                    setTouched,
                } = formik;

                async function handleNext() {
                    const validationErrors = await validateForm();

                    if (activeStep === 0) {
                        const fields = [
                            "firstName",
                            "lastName",
                            "email",
                            "phone",
                            "dateOfBirth",
                        ] as const;

                        const hasErrors = fields.some(
                            (field) => validationErrors[field]
                        );

                        if (hasErrors) {
                            await setTouched({
                                firstName: true,
                                lastName: true,
                                email: true,
                                phone: true,
                                dateOfBirth: true,
                            });
                            return;
                        }
                    }

                    if (activeStep === 1) {
                        const fields = [
                            "course",
                            "batch",
                            "startDate",
                            "trainer",
                            "experience",
                        ] as const;

                        const hasErrors = fields.some(
                            (field) => validationErrors[field]
                        );

                        if (hasErrors) {
                            await setTouched({
                                course: true,
                                batch: true,
                                startDate: true,
                                trainer: true,
                                experience: true,
                            });
                            return;
                        }
                    }

                    setActiveStep((prev) => prev + 1);
                }

                return (
                    <div className="form-wrapper">
                        <Stepper activeStep={activeStep}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <div className="form-content">
                            {/* STEP 1 */}
                            {activeStep === 0 && (
                                <div>
                                    <h2 className="form-section-title">
                                        Personal Information
                                    </h2>

                                    <div className="form-grid">
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.firstName &&
                                                Boolean(errors.firstName)
                                            }
                                            helperText={
                                                touched.firstName &&
                                                errors.firstName
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.lastName &&
                                                Boolean(errors.lastName)
                                            }
                                            helperText={
                                                touched.lastName &&
                                                errors.lastName
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.email &&
                                                Boolean(errors.email)
                                            }
                                            helperText={
                                                touched.email &&
                                                errors.email
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.phone &&
                                                Boolean(errors.phone)
                                            }
                                            helperText={
                                                touched.phone &&
                                                errors.phone
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={values.dateOfBirth}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                            error={
                                                touched.dateOfBirth &&
                                                Boolean(errors.dateOfBirth)
                                            }
                                            helperText={
                                                touched.dateOfBirth &&
                                                errors.dateOfBirth
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {activeStep === 1 && (
                                <div>
                                    <h2 className="form-section-title">
                                        Course Information
                                    </h2>

                                    <div className="form-grid">
                                        <TextField
                                            fullWidth
                                            label="Course"
                                            name="course"
                                            value={values.course}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.course &&
                                                Boolean(errors.course)
                                            }
                                            helperText={
                                                touched.course &&
                                                errors.course
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Batch"
                                            name="batch"
                                            value={values.batch}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.batch &&
                                                Boolean(errors.batch)
                                            }
                                            helperText={
                                                touched.batch &&
                                                errors.batch
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Start Date"
                                            name="startDate"
                                            type="date"
                                            value={values.startDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                            error={
                                                touched.startDate &&
                                                Boolean(errors.startDate)
                                            }
                                            helperText={
                                                touched.startDate &&
                                                errors.startDate
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Trainer"
                                            name="trainer"
                                            value={values.trainer}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.trainer &&
                                                Boolean(errors.trainer)
                                            }
                                            helperText={
                                                touched.trainer &&
                                                errors.trainer
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Experience"
                                            name="experience"
                                            value={values.experience}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.experience &&
                                                Boolean(errors.experience)
                                            }
                                            helperText={
                                                touched.experience &&
                                                errors.experience
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {activeStep === 2 && (
                                <div>
                                    <h2 className="form-section-title">
                                        Performance & Confirmation
                                    </h2>

                                    <div className="form-grid">
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                name="status"
                                                value={values.status}
                                                label="Status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={
                                                    touched.status &&
                                                    Boolean(errors.status)
                                                }
                                            >
                                                <MenuItem value="Active">
                                                    Active
                                                </MenuItem>
                                                <MenuItem value="Completed">
                                                    Completed
                                                </MenuItem>
                                                <MenuItem value="Inactive">
                                                    Inactive
                                                </MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            label="Score"
                                            name="score"
                                            type="number"
                                            value={values.score}
                                            onChange={(e) =>
                                                formik.setFieldValue(
                                                    "score",
                                                    e.target.value === ""
                                                        ? ""
                                                        : Number(e.target.value)
                                                )
                                            }
                                            onBlur={handleBlur}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 0,
                                                    max: 100,
                                                },
                                            }}
                                            error={
                                                touched.score &&
                                                Boolean(errors.score)
                                            }
                                            helperText={
                                                touched.score &&
                                                errors.score
                                            }
                                        />

                                        <TextField
                                            fullWidth
                                            label="Pending Assignments"
                                            name="pendingAssignments"
                                            type="number"
                                            value={values.pendingAssignments}
                                            onChange={(e) =>
                                                formik.setFieldValue(
                                                    "pendingAssignments",
                                                    e.target.value === ""
                                                        ? ""
                                                        : Number(e.target.value)
                                                )
                                            }
                                            onBlur={handleBlur}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 0,
                                                },
                                            }}
                                            error={
                                                touched.pendingAssignments &&
                                                Boolean(
                                                    errors.pendingAssignments
                                                )
                                            }
                                            helperText={
                                                touched.pendingAssignments &&
                                                errors.pendingAssignments
                                            }
                                        />
                                    </div>

                                    <div className="confirmation-card">
                                        <h3 className="confirmation-title">
                                            Confirmation Details
                                        </h3>

                                        <div className="confirmation-item">
                                            <strong>Name:</strong>
                                            {values.firstName} {values.lastName}
                                        </div>

                                        <div className="confirmation-item">
                                            <strong>Course:</strong>
                                            {values.course}
                                        </div>

                                        <div className="confirmation-item">
                                            <strong>Status:</strong>
                                            {values.status}
                                        </div>

                                        <div className="confirmation-item">
                                            <strong>Score:</strong>
                                            {values.score}
                                        </div>

                                        <div className="confirmation-item">
                                            <strong>Pending Assignments:</strong>
                                            {values.pendingAssignments}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-navigation">
                            <Button
                                disabled={activeStep === 0}
                                onClick={() =>
                                    setActiveStep((prev) => prev - 1)
                                }
                                sx={{ textTransform: "none" }}
                            >
                                Back
                            </Button>

                            {activeStep < steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ textTransform: "none" }}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => formik.submitForm()}
                                    sx={{ textTransform: "none" }}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}
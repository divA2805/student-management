"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";

import { Formik, FormikErrors } from "formik";
import * as Yup from "yup";

import { StudentInput } from "@/types/student";
import { useStudents } from "@/hooks/useStudents";

const steps = [
    "Personal Information",
    "Course Information",
    "Confirmation",
];

const initialValues: StudentInput = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    course: "",
    batch: "",
    startDate: "",
    trainer: "",
    experience: "",
};

const personalValidationSchema = Yup.object({
    firstName: Yup.string()
        .required("First name is required"),

    lastName: Yup.string()
        .required("Last name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits").required("Phone is required"),

    dateOfBirth: Yup.string()
        .required("Date of birth is required"),
});

const courseValidationSchema = Yup.object({
    course: Yup.string()
        .required("Course is required"),

    batch: Yup.string()
        .required("Batch is required"),

    startDate: Yup.string()
        .required("Start date is required"),

    trainer: Yup.string()
        .required("Trainer is required"),

    experience: Yup.string()
        .required("Experience is required"),
});

export default function StudentForm() {
    const [activeStep, setActiveStep] = useState(0);

    const router = useRouter();

    const { addStudent } = useStudents();

    async function handleSubmit(
        values: StudentInput
    ) {
        try {
            await addStudent(values);

            router.push("/students");
        } catch (error) {
            console.error("Failed to create student:", error);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={
                activeStep === 0
                    ? personalValidationSchema
                    : activeStep === 1
                        ? courseValidationSchema
                        : undefined
            }
            onSubmit={handleSubmit}
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
                    const validationErrors =
                        await validateForm();

                    if (activeStep === 0) {
                        const stepErrors: FormikErrors<StudentInput> = {};

                        if (validationErrors.firstName) {
                            stepErrors.firstName =
                                validationErrors.firstName;
                        }

                        if (validationErrors.lastName) {
                            stepErrors.lastName =
                                validationErrors.lastName;
                        }

                        if (validationErrors.email) {
                            stepErrors.email =
                                validationErrors.email;
                        }

                        if (validationErrors.phone) {
                            stepErrors.phone =
                                validationErrors.phone;
                        }

                        if (validationErrors.dateOfBirth) {
                            stepErrors.dateOfBirth =
                                validationErrors.dateOfBirth;
                        }

                        if (Object.keys(stepErrors).length > 0) {
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
                        const stepErrors: FormikErrors<StudentInput> = {};

                        if (validationErrors.course) {
                            stepErrors.course =
                                validationErrors.course;
                        }

                        if (validationErrors.batch) {
                            stepErrors.batch =
                                validationErrors.batch;
                        }

                        if (validationErrors.startDate) {
                            stepErrors.startDate =
                                validationErrors.startDate;
                        }

                        if (validationErrors.trainer) {
                            stepErrors.trainer =
                                validationErrors.trainer;
                        }

                        if (validationErrors.experience) {
                            stepErrors.experience =
                                validationErrors.experience;
                        }

                        if (Object.keys(stepErrors).length > 0) {
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

                function handleBack() {
                    setActiveStep((prev) => prev - 1);
                }

                return (
                    <Box sx={{ width: "100%", mt: 4 }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box sx={{ mt: 4 }}>
                            {activeStep === 0 && (
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 3 }}
                                    >
                                        Personal Information
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(2, 1fr)",
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.firstName &&
                                                Boolean(
                                                    errors.firstName
                                                )
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
                                                Boolean(
                                                    errors.lastName
                                                )
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
                                                Boolean(
                                                    errors.email
                                                )
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
                                                Boolean(
                                                    errors.phone
                                                )
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
                                                Boolean(
                                                    errors.dateOfBirth
                                                )
                                            }
                                            helperText={
                                                touched.dateOfBirth &&
                                                errors.dateOfBirth
                                            }
                                        />
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 3 }}
                                    >
                                        Course Information
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(2, 1fr)",
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Course"
                                            name="course"
                                            value={values.course}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.course &&
                                                Boolean(
                                                    errors.course
                                                )
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
                                                Boolean(
                                                    errors.batch
                                                )
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
                                                Boolean(
                                                    errors.startDate
                                                )
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
                                                Boolean(
                                                    errors.trainer
                                                )
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
                                                Boolean(
                                                    errors.experience
                                                )
                                            }
                                            helperText={
                                                touched.experience &&
                                                errors.experience
                                            }
                                        />
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 3 }}
                                    >
                                        Confirmation
                                    </Typography>

                                    <Box>
                                        <Typography>
                                            <strong>Name:</strong>{" "}
                                            {values.firstName}{" "}
                                            {values.lastName}
                                        </Typography>

                                        <Typography>
                                            <strong>Email:</strong>{" "}
                                            {values.email}
                                        </Typography>

                                        <Typography>
                                            <strong>Phone:</strong>{" "}
                                            {values.phone}
                                        </Typography>

                                        <Typography>
                                            <strong>Date of Birth:</strong>{" "}
                                            {values.dateOfBirth}
                                        </Typography>

                                        <Typography>
                                            <strong>Course:</strong>{" "}
                                            {values.course}
                                        </Typography>

                                        <Typography>
                                            <strong>Batch:</strong>{" "}
                                            {values.batch}
                                        </Typography>

                                        <Typography>
                                            <strong>Start Date:</strong>{" "}
                                            {values.startDate}
                                        </Typography>

                                        <Typography>
                                            <strong>Trainer:</strong>{" "}
                                            {values.trainer}
                                        </Typography>

                                        <Typography>
                                            <strong>Experience:</strong>{" "}
                                            {values.experience}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 4,
                            }}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>

                            {activeStep < steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        formik.submitForm()
                                    }
                                >
                                    Submit
                                </Button>
                            )}
                        </Box>
                    </Box>
                );
            }}
        </Formik>
    );
}
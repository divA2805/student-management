"use client";

import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { Student } from "@/types/student";
import { StudentProfileUpdateInput } from "@/hooks/useStudentProfile";

interface StudentProfileFormProps {
    student: Student;
    onSubmit: (values: StudentProfileUpdateInput) => Promise<void>;
}

const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
        .required("Phone is required"),
    experience: Yup.string().required("Experience is required"),
});

export default function StudentProfileForm({
    student,
    onSubmit,
}: StudentProfileFormProps) {
    const router = useRouter();

    const initialValues: StudentProfileUpdateInput = {
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        phone: student.phone || "",
        experience: student.experience || "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                const {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                } = formik;

                return (
                    <form onSubmit={handleSubmit}>
                        {/* Page Header */}
                        <div className="page-header">
                            <div>
                                <h1 className="page-title">Edit Profile</h1>
                                <p className="page-subtitle">
                                    Update your editable personal information.
                                </p>
                            </div>

                            <div className="page-actions">
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        router.push("/student/profile")
                                    }
                                    sx={{ textTransform: "none" }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ textTransform: "none" }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : "Save Changes"}
                                </Button>
                            </div>
                        </div>

                        {/* Editable Personal Information */}
                        <div className="card" style={{ marginBottom: "24px" }}>
                            <h2 className="card-title">
                                Editable Information
                            </h2>
                            <p className="card-subtitle">
                                You can modify your name, phone number, and
                                background experience.
                            </p>

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
                                        touched.firstName && errors.firstName
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
                                        touched.lastName && errors.lastName
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
                                        touched.phone && Boolean(errors.phone)
                                    }
                                    helperText={touched.phone && errors.phone}
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

                        {/* Read-Only System Information */}
                        <div className="card">
                            <h2 className="card-title">
                                Read-Only Information
                            </h2>
                            <p className="card-subtitle">
                                The following fields are managed by administrators
                                and cannot be changed here.
                            </p>

                            <div className="form-grid">
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={student.email}
                                    disabled
                                    helperText="Email is managed by admin"
                                />

                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    value={student.dateOfBirth}
                                    disabled
                                    helperText="Date of birth is managed by admin"
                                />

                                <TextField
                                    fullWidth
                                    label="Course"
                                    value={student.course}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Batch"
                                    value={student.batch}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Trainer"
                                    value={student.trainer}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    value={student.startDate}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Status"
                                    value={student.status}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="Score"
                                    value={`${student.score}%`}
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
}

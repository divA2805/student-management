"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading/Loading";

export default function StudentProfile() {
    const router = useRouter();
    const { logout } = useAuth();
    const { student, loading, error, notFound, loadStudent } =
        useStudentProfile();

    if (loading) {
        return <Loading />;
    }

    if (notFound || !student) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Student account no longer exists.
                </h2>
                <p className="card-subtitle">
                    Your student record could not be found in the system.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                    <Button
                        variant="outlined"
                        onClick={loadStudent}
                        sx={{ textTransform: "none" }}
                    >
                        Retry
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            logout();
                            router.replace("/login");
                        }}
                        sx={{ textTransform: "none" }}
                    >
                        Back to Login
                    </Button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="card">
                <h2 className="card-title">Unable to load profile</h2>
                <p className="card-subtitle">{error}</p>
                <Button
                    variant="contained"
                    onClick={loadStudent}
                    sx={{ textTransform: "none" }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">My Profile</h1>
                    <p className="page-subtitle">
                        Your personal details, enrollment, and performance summary.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/student/dashboard")}
                        sx={{ textTransform: "none" }}
                    >
                        Back to Dashboard
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => router.push("/student/profile/edit")}
                        sx={{ textTransform: "none" }}
                    >
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Personal Information */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <h2 className="card-title">Personal Information</h2>
                <p className="card-subtitle">
                    Your personal contact and identification information.
                </p>

                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">First Name</span>
                        <span className="detail-value">{student.firstName}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Last Name</span>
                        <span className="detail-value">{student.lastName}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{student.email}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{student.phone}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Date of Birth</span>
                        <span className="detail-value">{student.dateOfBirth}</span>
                    </div>
                </div>
            </div>

            {/* Course Information */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <h2 className="card-title">Course Information</h2>
                <p className="card-subtitle">
                    Your course registration and batch assignment.
                </p>

                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">Course</span>
                        <span className="detail-value">{student.course}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Batch</span>
                        <span className="detail-value">{student.batch}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Start Date</span>
                        <span className="detail-value">{student.startDate}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Trainer</span>
                        <span className="detail-value">{student.trainer}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Experience</span>
                        <span className="detail-value">{student.experience}</span>
                    </div>
                </div>
            </div>

            {/* Performance Summary */}
            <div className="card">
                <h2 className="card-title">Performance Summary</h2>
                <p className="card-subtitle">
                    Academic progress and assignment status.
                </p>

                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className="detail-value">{student.status}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Score</span>
                        <span className="detail-value">{student.score}%</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Pending Assignments</span>
                        <span className="detail-value">
                            {student.pendingAssignments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

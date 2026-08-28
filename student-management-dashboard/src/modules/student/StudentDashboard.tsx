"use client";

import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/modules/dashboard/StatCard";
import Loading from "@/components/Loading/Loading";

export default function StudentDashboard() {
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
                <h2 className="card-title">Unable to load dashboard</h2>
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

    const scoreNumber = Number(student.score) || 0;

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Student Dashboard</h1>
                    <p className="page-subtitle">
                        Overview of your learning progress and performance.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/student/profile")}
                        sx={{ textTransform: "none" }}
                    >
                        View Profile
                    </Button>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Welcome, {student.firstName} {student.lastName}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Enrolled in {student.course} ({student.batch})
                </Typography>
            </div>

            {/* Statistics */}
            <div className="stat-grid">
                <StatCard title="Score" value={`${scoreNumber}%`} />

                <StatCard
                    title="Pending Assignments"
                    value={student.pendingAssignments ?? 0}
                />

                <StatCard title="Status" value={student.status || "Active"} />
            </div>

            {/* Performance Card */}
            <div className="card" style={{ marginBottom: "24px" }}>
                <h2 className="card-title">Performance Overview</h2>
                <p className="card-subtitle">
                    Current course grade and completion metric.
                </p>

                <Box sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Overall Score
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 600 }}
                        >
                            {scoreNumber}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={Math.min(100, Math.max(0, scoreNumber))}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "var(--border)",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                backgroundColor:
                                    scoreNumber >= 75
                                        ? "var(--success)"
                                        : scoreNumber >= 50
                                        ? "var(--primary)"
                                        : "var(--warning)",
                            },
                        }}
                    />
                </Box>
            </div>

            {/* Course & Enrollment Information */}
            <div className="card">
                <h2 className="card-title">Course Information</h2>
                <p className="card-subtitle">
                    Details regarding your assigned batch and instructor.
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
                        <span className="detail-label">Trainer</span>
                        <span className="detail-value">{student.trainer}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Start Date</span>
                        <span className="detail-value">{student.startDate}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Experience</span>
                        <span className="detail-value">{student.experience}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

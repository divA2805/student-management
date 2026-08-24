"use client";

import {
    Box,
    Typography,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useStudents } from "@/hooks/useStudents";

import StatCard from "@/components/StatCard/StatCard";
import Loading from "@/components/Loading/Loading";

export default function DashboardPage() {
    const {
        students,
        loading,
        error,
        loadStudents,
    } = useStudents();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Box>
                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    Unable to load dashboard data.
                </Typography>

                <button onClick={loadStudents}>
                    Retry
                </button>
            </Box>
        );
    }


    const totalStudents =
        students.length;

    const activeStudents =
        students.filter(
            (student) =>student.status === "Active").length;

    const completedStudents =
        students.filter(
            (student) =>
                student.status === "Completed"
        ).length;

    const averageScore =
        students.length === 0
            ? 0
            : students.reduce(
                (sum, student) =>
                    sum + Number(student.score),
                0
            ) / students.length;

    const pendingAssignments =
        students.reduce(
            (sum, student) =>
                sum +
                Number(
                    student.pendingAssignments
                ),
            0
        );

    const scoreDistribution = [
        {
            range: "0-50",
            count: students.filter(
                (student) =>
                    Number(student.score) >= 0 &&
                    Number(student.score) <= 50
            ).length,
        },
        {
            range: "51-75",
            count: students.filter(
                (student) =>
                    Number(student.score) >= 51 &&
                    Number(student.score) <= 75
            ).length,
        },
        {
            range: "76-100",
            count: students.filter(
                (student) =>
                    Number(student.score) >= 76 &&
                    Number(student.score) <= 100
            ).length,
        },
    ];

    return (
        <Box>
            {/* Page Header */}

            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: "#111827",
                        mb: 0.5,
                    }}
                >
                    Dashboard
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6b7280",
                    }}
                >
                    Overview of student
                    performance and activity.
                </Typography>
            </Box>

            {/* Statistics */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <StatCard
                    title="Total Students"
                    value={totalStudents}
                />

                <StatCard
                    title="Active Students"
                    value={activeStudents}
                />

                <StatCard
                    title="Completed Students"
                    value={completedStudents}
                />

                <StatCard
                    title="Average Score"
                    value={`${averageScore.toFixed(
                        1
                    )}%`}
                />

                <StatCard
                    title="Pending Assignments"
                    value={pendingAssignments}
                />
            </Box>

            {/* Chart */}

            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    border:
                        "1px solid #e5e7eb",
                    borderRadius: 2,
                    p: 2.5,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                    }}
                >
                    Score Distribution
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6b7280",
                        mb: 3,
                    }}
                >
                    Number of students by
                    score range.
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        height: 320,
                    }}
                >
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={scoreDistribution}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="range"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                name="Students"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
}
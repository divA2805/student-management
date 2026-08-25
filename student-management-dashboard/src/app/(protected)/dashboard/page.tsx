"use client";

import { Button, Typography } from "@mui/material";
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
            <div className="card">
                <Typography
                    variant="h6"
                    className="card-title"
                    sx={{ mb: 2 }}
                >
                    Unable to load dashboard data.
                </Typography>

                <Button
                    variant="contained"
                    onClick={loadStudents}
                    sx={{ textTransform: "none" }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    const totalStudents = students.length;

    const activeStudents = students.filter(
        (student) => student.status === "Active"
    ).length;

    const completedStudents = students.filter(
        (student) => student.status === "Completed"
    ).length;

    const averageScore =
        students.length === 0
            ? 0
            : students.reduce(
                  (sum, student) => sum + Number(student.score),
                  0
              ) / students.length;

    const pendingAssignments = students.reduce(
        (sum, student) => sum + Number(student.pendingAssignments),
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
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Dashboard
                    </h1>
                    <p className="page-subtitle">
                        Overview of student performance and activity.
                    </p>
                </div>
            </div>

            {/* Statistics */}
            <div className="stat-grid">
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
                    value={`${averageScore.toFixed(1)}%`}
                />

                <StatCard
                    title="Pending Assignments"
                    value={pendingAssignments}
                />
            </div>

            {/* Chart */}
            <div className="chart-card">
                <h2 className="card-title">
                    Score Distribution
                </h2>

                <p className="card-subtitle">
                    Number of students by score range.
                </p>

                <div className="chart-container">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart data={scoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                name="Students"
                                fill="#1976d2"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
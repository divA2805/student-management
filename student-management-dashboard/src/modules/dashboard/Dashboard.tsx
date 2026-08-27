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

import { useDashboard } from "@/hooks/useDashboard";
import StatCard from "./StatCard";

import Loading from "@/components/Loading/Loading";

export default function Dashboard() {
    const {
        loading,
        error,
        loadStudents,

        totalStudents,
        activeStudents,
        completedStudents,
        averageScore,
        pendingAssignments,
        scoreDistribution,
    } = useDashboard();

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
                    sx={{
                        textTransform: "none",
                    }}
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
                    <h1 className="page-title">
                        Dashboard
                    </h1>

                    <p className="page-subtitle">
                        Overview of student performance
                        and activity.
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
                        <BarChart
                            data={scoreDistribution}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="range" />

                            <YAxis
                                allowDecimals={false}
                            />

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
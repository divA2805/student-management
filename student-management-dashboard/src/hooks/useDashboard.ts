"use client";

import { useStudents } from "@/hooks/useStudents";

export function useDashboard() {
    const {
        students,
        loading,
        error,
        loadStudents,
    } = useStudents();

    const totalStudents = students.length;

    const activeStudents = students.filter(
        (student) => student.status === "Active"
    ).length;

    const completedStudents = students.filter(
        (student) => student.status === "Completed"
    ).length;

    const averageScore =
        totalStudents === 0
            ? 0
            : students.reduce(
                  (sum, student) =>
                      sum + (Number(student.score) || 0),
                  0
              ) / totalStudents;

    const pendingAssignments = students.reduce(
        (sum, student) =>
            sum + (Number(student.pendingAssignments) || 0),
        0
    );

    const scoreDistribution = [
        {
            range: "0-50",
            count: students.filter((student) => {
                const score = Number(student.score) || 0;
                return score >= 0 && score <= 50;
            }).length,
        },
        {
            range: "51-75",
            count: students.filter((student) => {
                const score = Number(student.score) || 0;
                return score >= 51 && score <= 75;
            }).length,
        },
        {
            range: "76-100",
            count: students.filter((student) => {
                const score = Number(student.score) || 0;
                return score >= 76 && score <= 100;
            }).length,
        },
    ];

    return {
        students,
        loading,
        error,
        loadStudents,

        totalStudents,
        activeStudents,
        completedStudents,
        averageScore,
        pendingAssignments,
        scoreDistribution,
    };
}
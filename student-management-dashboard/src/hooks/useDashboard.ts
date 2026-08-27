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
                Number(student.pendingAssignments),
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
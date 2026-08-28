"use client";

import { useState, useEffect, useMemo } from "react";
import { Student } from "@/types/student";

export interface FilterState {
    search: string;
    course: string;
    status: string;
    scoreRange: string;
}

export function useStudentFilters(students: Student[]) {
    const [search, setSearch] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [scoreRange, setScoreRange] = useState<string>("");

    const [appliedFilters, setAppliedFilters] = useState<FilterState>({
        search: "",
        course: "",
        status: "",
        scoreRange: "",
    });

    // 300ms Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setAppliedFilters((prev) => ({
                ...prev,
                search,
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const filteredStudents = useMemo(() => {
        return students.filter((student: Student) => {
            const searchText = appliedFilters.search.toLowerCase().trim();
            const firstName = (student.firstName || "").toLowerCase();
            const lastName = (student.lastName || "").toLowerCase();
            const fullName = `${firstName} ${lastName}`.trim();
            const email = (student.email || "").toLowerCase();

            const matchesSearch =
                !searchText ||
                firstName.includes(searchText) ||
                lastName.includes(searchText) ||
                fullName.includes(searchText) ||
                email.includes(searchText);

            const matchesCourse =
                !appliedFilters.course ||
                student.course === appliedFilters.course;

            const matchesStatus =
                !appliedFilters.status ||
                student.status === appliedFilters.status;

            let matchesScore = true;
            const numericScore = Number(student.score) || 0;

            if (appliedFilters.scoreRange === "0-50") {
                matchesScore = numericScore >= 0 && numericScore <= 50;
            } else if (appliedFilters.scoreRange === "51-75") {
                matchesScore = numericScore >= 51 && numericScore <= 75;
            } else if (appliedFilters.scoreRange === "76-100") {
                matchesScore = numericScore >= 76 && numericScore <= 100;
            }

            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus &&
                matchesScore
            );
        });
    }, [students, appliedFilters]);

    const availableCourses = useMemo(() => {
        return Array.from(
            new Set(
                students
                    .map((s) => s.course)
                    .filter((c): c is string => Boolean(c && c.trim()))
            )
        );
    }, [students]);

    function applyFilters() {
        setAppliedFilters({
            search,
            course,
            status,
            scoreRange,
        });
    }

    function resetFilters() {
        setSearch("");
        setCourse("");
        setStatus("");
        setScoreRange("");

        setAppliedFilters({
            search: "",
            course: "",
            status: "",
            scoreRange: "",
        });
    }

    return {
        search,
        setSearch,
        course,
        setCourse,
        status,
        setStatus,
        scoreRange,
        setScoreRange,
        appliedFilters,
        filteredStudents,
        availableCourses,
        applyFilters,
        resetFilters,
    };
}

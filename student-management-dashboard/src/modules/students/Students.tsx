"use client";

import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import StudentTable from "./StudentTable/StudentTable";
import StudentFilters from "./StudentFilters/StudentFilters";

import Loading from "@/components/Loading/Loading";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/types/student";

export default function Students() {
    const router = useRouter();

    const {
        students,
        loading,
        error,
        loadStudents,
        deleteStudent,
    } = useStudents();

    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
    const [status, setStatus] = useState("");
    const [scoreRange, setScoreRange] = useState("");

    const [studentToDelete, setStudentToDelete] =
        useState<Student | null>(null);

    const [appliedFilters, setAppliedFilters] =
        useState({
            search: "",
            course: "",
            status: "",
            scoreRange: "",
        });

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setAppliedFilters((prev) => ({
                ...prev,
                search,
            }));
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    // Filtering
    const filteredStudents = students.filter(
        (student: Student) => {
            const searchText =
                appliedFilters.search
                    .toLowerCase()
                    .trim();

            const fullName =
                `${student.firstName} ${student.lastName}`
                    .toLowerCase();

            const email =
                student.email.toLowerCase();

            const matchesSearch =
                !searchText ||
                fullName.includes(searchText) ||
                email.includes(searchText);

            const matchesCourse =
                !appliedFilters.course ||
                student.course ===
                    appliedFilters.course;

            const matchesStatus =
                !appliedFilters.status ||
                student.status ===
                    appliedFilters.status;

            let matchesScore = true;

            if (
                appliedFilters.scoreRange ===
                "0-50"
            ) {
                matchesScore =
                    student.score >= 0 &&
                    student.score <= 50;
            } else if (
                appliedFilters.scoreRange ===
                "51-75"
            ) {
                matchesScore =
                    student.score >= 51 &&
                    student.score <= 75;
            } else if (
                appliedFilters.scoreRange ===
                "76-100"
            ) {
                matchesScore =
                    student.score >= 76 &&
                    student.score <= 100;
            }

            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus &&
                matchesScore
            );
        }
    );

    function handleApplyFilters() {
        setAppliedFilters({
            search,
            course,
            status,
            scoreRange,
        });
    }

    function handleReset() {
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

    async function handleDelete() {
        if (!studentToDelete) {
            return;
        }

        try {
            await deleteStudent(
                studentToDelete.id
            );

            setStudentToDelete(null);
        } catch (error) {
            console.error(error);
        }
    }

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
                    Unable to load students.
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
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        Students
                    </h1>

                    <p className="page-subtitle">
                        Manage student records
                        and performance.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push(
                                "/students/add"
                            )
                        }
                        sx={{
                            textTransform:
                                "none",
                        }}
                    >
                        Add Student
                    </Button>
                </div>
            </div>

            {/* Empty State */}
            {students.length === 0 ? (
                <div className="empty-state">
                    <h2 className="empty-state-title">
                        No students found
                    </h2>

                    <p className="empty-state-subtitle">
                        Add your first student
                        to get started.
                    </p>

                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push(
                                "/students/add"
                            )
                        }
                        sx={{
                            textTransform:
                                "none",
                        }}
                    >
                        Add Student
                    </Button>
                </div>
            ) : (
                <>
                    <StudentFilters
                        students={students}
                        search={search}
                        course={course}
                        status={status}
                        scoreRange={scoreRange}
                        onSearchChange={
                            setSearch
                        }
                        onCourseChange={
                            setCourse
                        }
                        onStatusChange={
                            setStatus
                        }
                        onScoreRangeChange={
                            setScoreRange
                        }
                        onApply={
                            handleApplyFilters
                        }
                        onReset={
                            handleReset
                        }
                    />

                    <p className="results-info">
                        Showing{" "}
                        {filteredStudents.length}{" "}
                        of {students.length}{" "}
                        students
                    </p>

                    <StudentTable
                        students={
                            filteredStudents
                        }
                        onDelete={(student) =>
                            setStudentToDelete(
                                student
                            )
                        }
                    />
                </>
            )}

            <ConfirmDialog
                open={Boolean(
                    studentToDelete
                )}
                title="Delete Student"
                message={
                    studentToDelete
                        ? `Are you sure you want to delete ${studentToDelete.firstName} ${studentToDelete.lastName}?`
                        : ""
                }
                onCancel={() =>
                    setStudentToDelete(null)
                }
                onConfirm={
                    handleDelete
                }
            />
        </div>
    );
}
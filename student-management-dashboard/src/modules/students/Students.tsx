"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import StudentTable from "./StudentTable/StudentTable";
import StudentFilters from "./StudentFilters/StudentFilters";
import Loading from "@/components/Loading/Loading";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";

import { useStudents } from "@/hooks/useStudents";
import { useStudentFilters } from "@/hooks/useStudentFilters";
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

    const {
        search,
        setSearch,
        course,
        setCourse,
        status,
        setStatus,
        scoreRange,
        setScoreRange,
        filteredStudents,
        availableCourses,
        applyFilters,
        resetFilters,
    } = useStudentFilters(students);

    const [studentToDelete, setStudentToDelete] =
        useState<Student | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    async function handleDelete() {
        if (!studentToDelete) {
            return;
        }

        try {
            setDeleteError(null);
            await deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
        } catch (err) {
            setDeleteError("Failed to delete student. Please try again.");
            console.error(err);
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
                    <h1 className="page-title">Students</h1>
                    <p className="page-subtitle">
                        Manage student records and performance.
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="contained"
                        onClick={() => router.push("/students/add")}
                        sx={{ textTransform: "none" }}
                    >
                        Add Student
                    </Button>
                </div>
            </div>

            {deleteError && (
                <div className="card" style={{ marginBottom: "16px" }}>
                    <Typography color="error" variant="body2">
                        {deleteError}
                    </Typography>
                </div>
            )}

            {/* Empty State: Case 1 - No students exist at all */}
            {students.length === 0 ? (
                <div className="empty-state">
                    <h2 className="empty-state-title">No students found</h2>
                    <p className="empty-state-subtitle">
                        Add your first student to get started.
                    </p>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/students/add")}
                        sx={{ textTransform: "none" }}
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
                        availableCourses={availableCourses}
                        onSearchChange={setSearch}
                        onCourseChange={setCourse}
                        onStatusChange={setStatus}
                        onScoreRangeChange={setScoreRange}
                        onApply={applyFilters}
                        onReset={resetFilters}
                    />

                    <p className="results-info">
                        Showing {filteredStudents.length} of {students.length} students
                    </p>

                    {/* Empty State: Case 2 - Filters return zero results */}
                    {filteredStudents.length === 0 ? (
                        <div className="empty-state">
                            <h2 className="empty-state-title">
                                No students match your filters.
                            </h2>
                            <p className="empty-state-subtitle">
                                Try adjusting or resetting your search and filter criteria.
                            </p>
                            <Button
                                variant="outlined"
                                onClick={resetFilters}
                                sx={{ textTransform: "none" }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        /* Case 3: Display filtered students in DataGrid */
                        <StudentTable
                            students={filteredStudents}
                            onDelete={(student) => setStudentToDelete(student)}
                        />
                    )}
                </>
            )}

            <ConfirmDialog
                open={Boolean(studentToDelete)}
                title="Delete Student"
                message={
                    studentToDelete
                        ? `Are you sure you want to delete ${studentToDelete.firstName} ${studentToDelete.lastName}?`
                        : ""
                }
                onCancel={() => setStudentToDelete(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
"use client";

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import { Student } from "@/types/student";

interface StudentFiltersProps {
    students: Student[];
    search: string;
    course: string;
    status: string;
    scoreRange: string;
    onSearchChange: (value: string) => void;
    onCourseChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onScoreRangeChange: (value: string) => void;
    onApply: () => void;
    onReset: () => void;
}

export default function StudentFilters({
    students,
    search,
    course,
    status,
    scoreRange,
    onSearchChange,
    onCourseChange,
    onStatusChange,
    onScoreRangeChange,
    onApply,
    onReset,
}: StudentFiltersProps) {
    const courses = Array.from(
        new Set(students.map((student) => student.course))
    );

    return (
        <div className="filter-card">
            {/* Search */}
            <div className="filter-search-container">
                <TextField
                    fullWidth
                    size="small"
                    label="Search by name or email"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                />
            </div>

            {/* Filters */}
            <div className="filter-grid">
                {/* Course */}
                <FormControl fullWidth size="small">
                    <InputLabel>Course</InputLabel>
                    <Select
                        value={course}
                        label="Course"
                        onChange={(event) =>
                            onCourseChange(event.target.value)
                        }
                    >
                        <MenuItem value="">
                            All Courses
                        </MenuItem>
                        {courses.map((courseName) => (
                            <MenuItem
                                key={courseName}
                                value={courseName}
                            >
                                {courseName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Status */}
                <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(event) =>
                            onStatusChange(event.target.value)
                        }
                    >
                        <MenuItem value="">
                            All Statuses
                        </MenuItem>
                        <MenuItem value="Active">
                            Active
                        </MenuItem>
                        <MenuItem value="Completed">
                            Completed
                        </MenuItem>
                        <MenuItem value="Inactive">
                            Inactive
                        </MenuItem>
                    </Select>
                </FormControl>

                {/* Score */}
                <FormControl fullWidth size="small">
                    <InputLabel>Score</InputLabel>
                    <Select
                        value={scoreRange}
                        label="Score"
                        onChange={(event) =>
                            onScoreRangeChange(event.target.value)
                        }
                    >
                        <MenuItem value="">
                            All Scores
                        </MenuItem>
                        <MenuItem value="0-50">
                            0 - 50
                        </MenuItem>
                        <MenuItem value="51-75">
                            51 - 75
                        </MenuItem>
                        <MenuItem value="76-100">
                            76 - 100
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Actions */}
            <div className="filter-actions">
                <Button
                    variant="outlined"
                    onClick={onReset}
                    sx={{ textTransform: "none" }}
                >
                    Reset
                </Button>

                <Button
                    variant="contained"
                    onClick={onApply}
                    sx={{ textTransform: "none" }}
                >
                    Apply Filters
                </Button>
            </div>
        </div>
    );
}
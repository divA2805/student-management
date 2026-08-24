"use client";

import {
    Box,
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

    onSearchChange: (
        value: string
    ) => void;

    onCourseChange: (
        value: string
    ) => void;

    onStatusChange: (
        value: string
    ) => void;

    onScoreRangeChange: (
        value: string
    ) => void;

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
        new Set(
            students.map(
                (student) => student.course
            )
        )
    );

    return (
        <Box
            sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                p: 2,
                mb: 3,
            }}
        >
            {/* Search */}

            <TextField
                fullWidth
                size="small"
                label="Search by name or email"
                value={search}
                onChange={(event) =>
                    onSearchChange(
                        event.target.value
                    )
                }
                sx={{
                    mb: 2,
                }}
            />

            {/* Filters */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(3, 1fr)",
                    },
                    gap: 2,
                }}
            >
                {/* Course */}

                <FormControl
                    fullWidth
                    size="small"
                >
                    <InputLabel>
                        Course
                    </InputLabel>

                    <Select
                        value={course}
                        label="Course"
                        onChange={(event) =>
                            onCourseChange(
                                event.target.value
                            )
                        }
                    >
                        <MenuItem value="">
                            All Courses
                        </MenuItem>

                        {courses.map(
                            (courseName) => (
                                <MenuItem
                                    key={courseName}
                                    value={
                                        courseName
                                    }
                                >
                                    {courseName}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>

                {/* Status */}

                <FormControl
                    fullWidth
                    size="small"
                >
                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(event) =>
                            onStatusChange(
                                event.target.value
                            )
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

                <FormControl
                    fullWidth
                    size="small"
                >
                    <InputLabel>
                        Score
                    </InputLabel>

                    <Select
                        value={scoreRange}
                        label="Score"
                        onChange={(event) =>
                            onScoreRangeChange(
                                event.target.value
                            )
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
            </Box>

            {/* Buttons */}

            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-end",
                    mt: 2,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onReset}
                    sx={{
                        textTransform: "none",
                    }}
                >
                    Reset
                </Button>

                <Button
                    variant="contained"
                    onClick={onApply}
                    sx={{
                        textTransform: "none",
                    }}
                >
                    Apply Filters
                </Button>
            </Box>
        </Box>
    );
}
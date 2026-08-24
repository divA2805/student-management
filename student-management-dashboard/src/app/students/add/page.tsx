"use client";

import { Box, Typography } from "@mui/material";
import StudentForm from "@/components/StudentForm/StudentForm";

export default function AddStudentPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                p: 4,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1000,
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: 600,
                    }}
                >
                    Add Student
                </Typography>

                <StudentForm />
            </Box>
        </Box>
    );
}
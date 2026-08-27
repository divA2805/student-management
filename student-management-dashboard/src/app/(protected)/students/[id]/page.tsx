"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

import { getStudentById } from "@/services/studentService";
import { Student } from "@/types/student";

import Loading from "@/components/Loading/Loading";
import StudentDetails from "@/modules/students/StudentDetails";

export default function StudentDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [student, setStudent] =
        useState<Student | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadStudent() {
            try {
                const id = Number(params.id);

                const data =
                    await getStudentById(id);

                if (data) {
                    setStudent(data);
                }
            } finally {
                setLoading(false);
            }
        }

        loadStudent();
    }, [params.id]);

    if (loading) {
        return <Loading />;
    }

    if (!student) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Student not found
                </h2>

                <p className="card-subtitle">
                    The requested student record
                    could not be found.
                </p>

                <Button
                    variant="contained"
                    onClick={() =>
                        router.push("/students")
                    }
                    sx={{
                        textTransform: "none",
                    }}
                >
                    Back to Students
                </Button>
            </div>
        );
    }

    return (
        <StudentDetails student={student} />
    );
}
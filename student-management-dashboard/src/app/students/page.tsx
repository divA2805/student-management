"use client";

import { useRouter } from "next/navigation";
import StudentTable from "@/components/StudentTable/StudentTable";
import Loading from "@/components/Loading/Loading";
import { useStudents } from "@/hooks/useStudents";

export default function StudentsPage() {
    const router = useRouter();

    const {
        students,
        loading,
        error,
        loadStudents,
    } = useStudents();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div>
                <h2>Unable to load students.</h2>

                <button onClick={loadStudents}>
                    Retry
                </button>
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div>
                <h2>No students found.</h2>

                <button
                    onClick={() => router.push("/students/add")}
                >
                    Add Student
                </button>
            </div>
        );
    }

    return (
        <main>
            <h1>Students</h1>

            <StudentTable students={students} />
        </main>
    );
}
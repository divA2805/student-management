"use client";

import { useRouter } from "next/navigation";

import StudentForm from "@/components/StudentForm/StudentForm";
import { StudentInput } from "@/types/student";
import { createStudent } from "@/services/studentService";

const initialValues: StudentInput = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",

    course: "",
    batch: "",
    startDate: "",
    trainer: "",
    experience: "",

    status: "Active",
    score: 0,
    pendingAssignments: 0,
};

export default function AddStudentPage() {
    const router = useRouter();

    async function handleSubmit(data: StudentInput) {
        await createStudent(data);
        router.push("/students");
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Add Student</h1>
                    <p className="page-subtitle">
                        Enter details to register a new student.
                    </p>
                </div>
            </div>

            <StudentForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
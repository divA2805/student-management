// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import { useParams, useRouter } from "next/navigation";

// import { getStudentById, updateStudent } from "@/services/studentService";
// import { Student, StudentInput } from "@/types/student";
// import StudentForm from "@/modules/students/StudentForm/StudentForm";
// import Loading from "@/components/Loading/Loading";

// export default function EditStudentPage() {
//     const params = useParams();
//     const router = useRouter();

//     const [student, setStudent] = useState<Student | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function loadStudent() {
//             const data = await getStudentById(Number(params.id));
//             setStudent(data ?? null);
//             setLoading(false);
//         }

//         loadStudent();
//     }, [params.id]);

//     async function handleSubmit(data: StudentInput) {
//         await updateStudent(Number(params.id), data);
//         router.push("/students");
//     }

//     if (loading) {
//         return <Loading />;
//     }

//     if (!student) {
//         return (
//             <div className="card">
//                 <h2 className="card-title">Student not found</h2>
//                 <p className="card-subtitle">
//                     The requested student record could not be found.
//                 </p>
//                 <Button
//                     variant="contained"
//                     onClick={() => router.push("/students")}
//                     sx={{ textTransform: "none" }}
//                 >
//                     Back to Students
//                 </Button>
//             </div>
//         );
//     }

//     const initialValues: StudentInput = {
//         firstName: student.firstName,
//         lastName: student.lastName,
//         email: student.email,
//         phone: student.phone,
//         dateOfBirth: student.dateOfBirth,

//         course: student.course,
//         batch: student.batch,
//         startDate: student.startDate,
//         trainer: student.trainer,
//         experience: student.experience,

//         status: student.status,
//         score: student.score,
//         pendingAssignments: student.pendingAssignments,
//     };

//     return (
//         <div>
//             <div className="page-header">
//                 <div>
//                     <h1 className="page-title">Edit Student</h1>
//                     <p className="page-subtitle">
//                         Update student details and record information.
//                     </p>
//                 </div>
//             </div>

//             <StudentForm
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

import StudentForm from "@/modules/students/StudentForm/StudentForm";
import Loading from "@/components/Loading/Loading";

import { getStudentById } from "@/services/studentService";
import { useStudents } from "@/hooks/useStudents";

import {
    Student,
    StudentInput,
} from "@/types/student";

export default function EditStudentPage() {
    const params = useParams();
    const router = useRouter();

    const { updateStudent } = useStudents();

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

    // Store the ID after the null check.
    const studentId = student.id;

    const initialValues: StudentInput = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.dateOfBirth,
        course: student.course,
        batch: student.batch,
        startDate: student.startDate,
        trainer: student.trainer,
        experience: student.experience,
        status: student.status,
        score: student.score,
        pendingAssignments:
            student.pendingAssignments,
    };

    async function handleSubmit(
        data: StudentInput
    ) {
        await updateStudent(
            studentId,
            data
        );

        router.push("/students");
    }

    return (
        <StudentForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
        />
    );
}
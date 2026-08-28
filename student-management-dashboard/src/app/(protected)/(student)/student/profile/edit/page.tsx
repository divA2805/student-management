"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import {
    useStudentProfile,
    StudentProfileUpdateInput,
} from "@/hooks/useStudentProfile";
import { useAuth } from "@/context/AuthContext";
import StudentProfileForm from "@/modules/student/StudentProfileForm";
import Loading from "@/components/Loading/Loading";

export default function StudentEditProfilePage() {
    const router = useRouter();
    const { logout } = useAuth();
    const { student, loading, error, notFound, loadStudent, updateProfile } =
        useStudentProfile();

    if (loading) {
        return <Loading />;
    }

    if (notFound || !student) {
        return (
            <div className="card">
                <h2 className="card-title">
                    Student account no longer exists.
                </h2>
                <p className="card-subtitle">
                    Your student record could not be found in the system.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                    <Button
                        variant="outlined"
                        onClick={loadStudent}
                        sx={{ textTransform: "none" }}
                    >
                        Retry
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            logout();
                            router.replace("/login");
                        }}
                        sx={{ textTransform: "none" }}
                    >
                        Back to Login
                    </Button>
                </div>
            </div>
        );
    }

    async function handleSubmit(data: StudentProfileUpdateInput) {
        await updateProfile(data);
        router.push("/student/profile");
    }

    return (
        <div>
            {error && (
                <div className="card" style={{ marginBottom: "16px" }}>
                    <p style={{ color: "var(--danger)" }}>{error}</p>
                </div>
            )}
            <StudentProfileForm
                student={student}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

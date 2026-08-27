"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Student } from "@/types/student";

type StudentDetailsProps = {
    student: Student;
};

export default function StudentDetails({
    student,
}: StudentDetailsProps) {
    const router = useRouter();

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        {student.firstName} {student.lastName}
                    </h1>

                    <p className="page-subtitle">
                        Student Details & Performance Overview
                    </p>
                </div>

                <div className="page-actions">
                    <Button
                        variant="outlined"
                        onClick={() => router.push("/students")}
                        sx={{ textTransform: "none" }}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push(
                                `/students/${student.id}/edit`
                            )
                        }
                        sx={{ textTransform: "none" }}
                    >
                        Edit Student
                    </Button>
                </div>
            </div>

            <div className="card">
                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">
                            First Name
                        </span>
                        <span className="detail-value">
                            {student.firstName}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Last Name
                        </span>
                        <span className="detail-value">
                            {student.lastName}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Email
                        </span>
                        <span className="detail-value">
                            {student.email}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Phone
                        </span>
                        <span className="detail-value">
                            {student.phone}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Date of Birth
                        </span>
                        <span className="detail-value">
                            {student.dateOfBirth}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Course
                        </span>
                        <span className="detail-value">
                            {student.course}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Batch
                        </span>
                        <span className="detail-value">
                            {student.batch}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Start Date
                        </span>
                        <span className="detail-value">
                            {student.startDate}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Trainer
                        </span>
                        <span className="detail-value">
                            {student.trainer}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Experience
                        </span>
                        <span className="detail-value">
                            {student.experience}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Status
                        </span>
                        <span className="detail-value">
                            {student.status}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Score
                        </span>
                        <span className="detail-value">
                            {student.score}%
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">
                            Pending Assignments
                        </span>
                        <span className="detail-value">
                            {student.pendingAssignments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
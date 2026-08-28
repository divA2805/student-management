"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getStudentById, updateStudent } from "@/services/studentService";
import { Student } from "@/types/student";

export interface StudentProfileUpdateInput {
    firstName: string;
    lastName: string;
    phone: string;
    experience: string;
}

export function useStudentProfile() {
    const { user, invalidateSession } = useAuth();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const loadStudent = useCallback(async () => {
        if (!user || user.role !== "student" || !user.studentId) {
            setLoading(false);
            setError("Invalid student session.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setNotFound(false);

            const data = await getStudentById(user.studentId);

            if (!data) {
                setStudent(null);
                setNotFound(true);
                setError("Student account no longer exists.");
                invalidateSession("User does not exist.");
            } else {
                setStudent(data);
            }
        } catch {
            setError("Unable to load student profile.");
        } finally {
            setLoading(false);
        }
    }, [user, invalidateSession]);

    useEffect(() => {
        loadStudent();
    }, [loadStudent]);

    async function updateProfile(
        data: StudentProfileUpdateInput
    ): Promise<Student> {
        if (!user || !user.studentId || !student) {
            throw new Error("Student record unavailable.");
        }

        // Security rule: Only send permitted editable fields
        const safeUpdatedInput = {
            ...student,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            phone: data.phone.trim(),
            experience: data.experience.trim(),
        };

        try {
            setError(null);
            const result = await updateStudent(
                user.studentId,
                safeUpdatedInput
            );
            setStudent(result);
            return result;
        } catch (err) {
            setError("Unable to update profile.");
            throw err;
        }
    }

    return {
        student,
        loading,
        error,
        notFound,
        loadStudent,
        updateProfile,
    };
}

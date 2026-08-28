import { getStudents, getStudentById } from "@/services/studentService";
import { AuthUser, UserRole } from "@/types/auth";

export function convertDobToStorageFormat(dob: string): string | null {
    const trimmed = dob.trim();
    // Validate format DD/MM/YYYY
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
    if (!match) {
        return null;
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Basic date validity check
    if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        year < 1900 ||
        year > 2100
    ) {
        return null;
    }

    const dayStr = match[1];
    const monthStr = match[2];
    const yearStr = match[3];

    return `${yearStr}-${monthStr}-${dayStr}`;
}

export function loginAdmin(
    username: string,
    password: string
): AuthUser | null {
    if (username.trim() === "admin" && password === "1234") {
        return {
            role: "admin",
            username: "admin",
        };
    }
    return null;
}

export async function loginStudent(
    email: string,
    dateOfBirth: string
): Promise<AuthUser | null> {
    const convertedDob = convertDobToStorageFormat(dateOfBirth);
    if (!convertedDob) {
        return null;
    }

    try {
        const students = await getStudents();
        if (!students || !Array.isArray(students)) {
            return null;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const student = students.find((s) =>
                s.email.toLowerCase() === normalizedEmail &&
                s.dateOfBirth.trim() === convertedDob
        );

        if (student) {
            return {
                role: "student",
                username: student.email,
                email: student.email,
                studentId: student.id,
            };
        }

        return null;
    } catch {
        return null;
    }
}

export async function authenticateUser(
    username: string,
    password: string,
    role?: UserRole
): Promise<AuthUser | null> {
    if (role === "admin") {
        return loginAdmin(username, password);
    }

    if (role === "student") {
        return await loginStudent(username, password);
    }

    const adminUser = loginAdmin(username, password);
    if (adminUser) {
        return adminUser;
    }

    return await loginStudent(username, password);
}

export async function validateUser(user: AuthUser): Promise<boolean> {
    if (user.role === "admin") {
        return true;
    }

    if (user.role === "student") {
        if (!user.studentId) {
            return false;
        }

        try {
            const student = await getStudentById(user.studentId);
            return Boolean(student);
        } catch {
            return false;
        }
    }

    return false;
}

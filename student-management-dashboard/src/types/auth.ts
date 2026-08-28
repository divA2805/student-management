export type UserRole = "admin" | "student";

export interface AuthUser {
    role: UserRole;
    username: string;
    email?: string;
    studentId?: number;
}

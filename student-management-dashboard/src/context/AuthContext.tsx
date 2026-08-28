"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useCallback,
} from "react";
import { AuthUser, UserRole } from "@/types/auth";
import { authenticateUser, validateUser } from "@/services/authService";

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loading: boolean;
    username: string | null;
    authError: string | null;
    clearAuthError: () => void;
    invalidateSession: (message?: string) => void;
    login: (
        username: string,
        password: string,
        role?: UserRole
    ) => Promise<AuthUser | null>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    const clearAuthError = useCallback(() => {
        setAuthError(null);
    }, []);

    const invalidateSession = useCallback(
        (message: string = "User does not exist.") => {
            localStorage.removeItem("authUser");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("username");
            setUser(null);
            setAuthError(message);
        },
        []
    );

    useEffect(() => {
        async function restoreSession() {
            try {
                const storedUser = localStorage.getItem("authUser");
                if (storedUser) {
                    const parsedUser: AuthUser = JSON.parse(storedUser);
                    if (parsedUser && parsedUser.role && parsedUser.username) {
                        if (parsedUser.role === "admin") {
                            setUser(parsedUser);
                        } else if (parsedUser.role === "student") {
                            const isValid = await validateUser(parsedUser);
                            if (isValid) {
                                setUser(parsedUser);
                            } else {
                                localStorage.removeItem("authUser");
                                setUser(null);
                                setAuthError("User does not exist.");
                            }
                        }
                    }
                }
            } catch {
                localStorage.removeItem("authUser");
            } finally {
                setIsLoading(false);
            }
        }

        restoreSession();
    }, []);

    async function login(
        enteredUsername: string,
        enteredPassword: string,
        role?: UserRole
    ): Promise<AuthUser | null> {
        setAuthError(null);

        const authenticatedUser = await authenticateUser(
            enteredUsername,
            enteredPassword,
            role
        );

        if (authenticatedUser) {
            localStorage.setItem(
                "authUser",
                JSON.stringify(authenticatedUser)
            );
            setUser(authenticatedUser);
            return authenticatedUser;
        }

        return null;
    }

    function logout() {
        localStorage.removeItem("authUser");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        setUser(null);
        setAuthError(null);
    }

    const isAuthenticated = Boolean(user);
    const username = user ? user.username : null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                loading: isLoading,
                username,
                authError,
                clearAuthError,
                invalidateSession,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
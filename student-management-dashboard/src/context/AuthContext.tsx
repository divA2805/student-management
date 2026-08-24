"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [username, setUsername] = useState<string | null>(
        null
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticated =
            localStorage.getItem("isAuthenticated");

        const storedUsername =
            localStorage.getItem("username");

        if (authenticated === "true") {
            setIsAuthenticated(true);
            setUsername(storedUsername);
        }

        setLoading(false);
    }, []);

    function login(
        enteredUsername: string,
        enteredPassword: string
    ) {
        if (
            enteredUsername === "admin" &&
            enteredPassword === "1234"
        ) {
            localStorage.setItem(
                "isAuthenticated",
                "true"
            );

            localStorage.setItem(
                "username",
                "admin"
            );

            setIsAuthenticated(true);
            setUsername("admin");

            return true;
        }

        return false;
    }

    function logout() {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");

        setIsAuthenticated(false);
        setUsername(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                username,
                login,
                logout,
                loading,
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
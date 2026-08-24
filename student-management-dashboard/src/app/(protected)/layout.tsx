"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProtectedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    const {
        isAuthenticated,
        loading,
    } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [
        loading,
        isAuthenticated,
        router,
    ]);

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
            }}
        >
            <Header />

            <Box
                sx={{
                    display: "flex",
                    minHeight: "calc(100vh - 64px)",
                }}
            >
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        p: {
                            xs: 2,
                            md: 3,
                        },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
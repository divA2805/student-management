"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ProtectedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="app-shell">
            <Header />

            <div className="app-body">
                <Sidebar />

                <main className="app-main">
                    {children}
                </main>
            </div>
        </div>
    );
}
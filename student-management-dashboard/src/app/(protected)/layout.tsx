"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Loading from "@/components/Loading/Loading";

export default function ProtectedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return <Loading />;
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
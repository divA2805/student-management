"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && user && user.role !== "admin") {
            router.replace("/student/dashboard");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return null;
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}

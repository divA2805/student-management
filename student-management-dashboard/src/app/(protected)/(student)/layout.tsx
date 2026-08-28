"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function StudentLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && user && user.role !== "student") {
            router.replace("/dashboard");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return null;
    }

    if (!user || user.role !== "student") {
        return null;
    }

    return <>{children}</>;
}

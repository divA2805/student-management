"use client";

import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const router = useRouter();

    const {
        username,
        logout,
    } = useAuth();

    function handleLogout() {
        logout();

        router.replace("/login");
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                color: "#111827",
                borderBottom:
                    "1px solid #e5e7eb",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: "64px",
                    px: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                {/* Logo / Application Name */}

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                    }}
                >
                    Student Management
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* User */}

                <Typography
                    variant="body2"
                    sx={{
                        color: "#6b7280",
                        mr: 2,
                    }}
                >
                    {username || "Admin"}
                </Typography>

                <Button
                    size="small"
                    onClick={handleLogout}
                    sx={{
                        textTransform: "none",
                        color: "#374151",
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
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
    const { username, logout } = useAuth();

    function handleLogout() {
        logout();
        router.replace("/login");
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            className="app-header"
        >
            <Toolbar className="app-header-toolbar">
                {/* Logo / Application Name */}
                <Typography
                    variant="h6"
                    component="div"
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
                    color="text.secondary"
                    sx={{ mr: 2 }}
                >
                    {username || "Admin"}
                </Typography>

                <Button
                    size="small"
                    onClick={handleLogout}
                    sx={{
                        textTransform: "none",
                        color: "text.primary",
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
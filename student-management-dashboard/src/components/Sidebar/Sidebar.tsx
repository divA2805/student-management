"use client";

import Link from "next/link";
import {
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    if (user?.role === "student") {
        return (
            <aside className="app-sidebar">
                <List sx={{ p: 1.5 }}>
                    <ListItemButton
                        component={Link}
                        href="/student/dashboard"
                        sx={{
                            borderRadius: 1,
                            mb: 0.5,
                        }}
                    >
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        href="/student/profile"
                        sx={{
                            borderRadius: 1,
                            mb: 0.5,
                        }}
                    >
                        <ListItemText primary="My Profile" />
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        href="/student/events"
                        sx={{
                            borderRadius: 1,
                        }}
                    >
                        <ListItemText primary="Events" />
                    </ListItemButton>
                </List>
            </aside>
        );
    }

    return (
        <aside className="app-sidebar">
            <List sx={{ p: 1.5 }}>
                <ListItemButton
                    component={Link}
                    href="/dashboard"
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                    }}
                >
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    href="/students"
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                    }}
                >
                    <ListItemText primary="Students" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    href="/events"
                    sx={{
                        borderRadius: 1,
                    }}
                >
                    <ListItemText primary="Events" />
                </ListItemButton>
            </List>
        </aside>
    );
}
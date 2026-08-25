"use client";

import Link from "next/link";
import {
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

export default function Sidebar() {
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
                    }}
                >
                    <ListItemText primary="Students" />
                </ListItemButton>
            </List>
        </aside>
    );
}
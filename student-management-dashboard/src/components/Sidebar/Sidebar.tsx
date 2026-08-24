"use client";

import Link from "next/link";

import {
    Box,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

export default function Sidebar() {
    return (
        <Box
            component="aside"
            sx={{
                width: 220,
                flexShrink: 0,
                backgroundColor: "#ffffff",
                borderRight:
                    "1px solid #e5e7eb",
                display: {
                    xs: "none",
                    md: "block",
                },
            }}
        >
            <List sx={{ p: 1.5 }}>
                <ListItemButton
                    component={Link}
                    href="/dashboard"
                    sx={{
                        borderRadius: 1,
                        mb: 0.5,
                    }}
                >
                    <ListItemText
                        primary="Dashboard"
                    />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    href="/students"
                    sx={{
                        borderRadius: 1,
                    }}
                >
                    <ListItemText
                        primary="Students"
                    />
                </ListItemButton>
            </List>
        </Box>
    );
}
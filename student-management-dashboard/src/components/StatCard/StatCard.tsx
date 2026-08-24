"use client";

import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({
    title,
    value,
}: StatCardProps) {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                border:
                    "1px solid #e5e7eb",
                borderRadius: 2,
            }}
        >
            <CardContent
                sx={{
                    p: 2.5,
                    "&:last-child": {
                        pb: 2.5,
                    },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: "#6b7280",
                        mb: 1,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: "#111827",
                    }}
                >
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}
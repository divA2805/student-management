"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();

    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        const success = login(username, password);

        if (success) {
            router.replace("/dashboard");
        } else {
            setError("Invalid username or password.");
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f6f8",
                px: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight:600,
                        mb:1,
                    }}
                >
                    Student Management
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{mb:3,}}
                >
                    Sign in to continue
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        margin="normal"
                        error={Boolean(error)}
                    />

                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
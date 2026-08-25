"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
        <div className="login-wrapper">
            <div className="login-card">
                <Typography
                    variant="h5"
                    component="h1"
                    className="page-title"
                >
                    Student Management
                </Typography>

                <Typography
                    variant="body2"
                    className="page-subtitle"
                    sx={{ mb: 3 }}
                >
                    Sign in to continue
                </Typography>

                <form onSubmit={handleSubmit}>
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
                            className="login-error"
                            variant="body2"
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, textTransform: "none" }}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
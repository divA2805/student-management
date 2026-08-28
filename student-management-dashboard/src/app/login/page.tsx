"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/auth";

export default function LoginPage() {
    const router = useRouter();
    const { login, authError, clearAuthError } = useAuth();

    const [selectedRole, setSelectedRole] =
        useState<UserRole>("admin");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleRoleChange(
        _event: React.MouseEvent<HTMLElement>,
        newRole: UserRole | null
    ) {
        if (newRole !== null) {
            setSelectedRole(newRole);
            setError("");
            clearAuthError();
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        clearAuthError();

        const user = await login(username, password, selectedRole);

        if (user) {
            if (user.role === "admin") {
                router.push("/dashboard");
            } else if (user.role === "student") {
                router.push("/student/dashboard");
            }
        } else {
            setError("Invalid username or password.");
        }
    }

    const displayError = error || authError;

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
                    sx={{ mb: 2.5 }}
                >
                    Sign in to continue
                </Typography>

                {/* Role Selector Toggle */}
                <Box sx={{ mb: 2.5 }}>
                    <ToggleButtonGroup
                        value={selectedRole}
                        exclusive
                        onChange={handleRoleChange}
                        fullWidth
                        size="small"
                        aria-label="login role"
                    >
                        <ToggleButton
                            value="admin"
                            aria-label="admin login"
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                gap: 1,
                                py: 1,
                            }}
                        >
                            <AdminPanelSettingsIcon fontSize="small" />
                            ADMIN
                        </ToggleButton>

                        <ToggleButton
                            value="student"
                            aria-label="student login"
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                gap: 1,
                                py: 1,
                            }}
                        >
                            <PersonIcon fontSize="small" />
                            STUDENT
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={
                            selectedRole === "admin"
                                ? "Username"
                                : "Email"
                        }
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            if (authError) clearAuthError();
                        }}
                        margin="normal"
                        autoComplete={
                            selectedRole === "admin"
                                ? "username"
                                : "email"
                        }
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            if (authError) clearAuthError();
                        }}
                        margin="normal"
                        helperText={
                            selectedRole === "admin"
                                ? "Password: 1234"
                                : "Password format: DD/MM/YYYY"
                        }
                        error={Boolean(displayError)}
                    />

                    {displayError && (
                        <Typography
                            className="login-error"
                            variant="body2"
                        >
                            {displayError}
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
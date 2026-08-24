"use client";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
        >
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onCancel}
                    sx={{
                        textTransform:
                            "none",
                    }}
                >
                    Cancel
                </Button>

                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    sx={{
                        textTransform:
                            "none",
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
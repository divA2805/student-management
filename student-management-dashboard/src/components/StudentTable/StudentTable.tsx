"use client";

import {
    DataGrid,
    GridColDef,
} from "@mui/x-data-grid";

import {
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutlined } from "@mui/icons-material";

import { useRouter } from "next/navigation";
import { Student } from "@/types/student";

interface StudentTableProps {
    students: Student[];
    onDelete?: (student: Student) => void;
}

export default function StudentTable({
    students,
    onDelete,
}: StudentTableProps) {
    const router = useRouter();

    const columns: GridColDef<Student>[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1.2,
            minWidth: 180,
            valueGetter: (_value, row) =>
                `${row.firstName} ${row.lastName}`,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1.5,
            minWidth: 220,
        },
        {
            field: "course",
            headerName: "Course",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8,
            minWidth: 110,
        },
        {
            field: "score",
            headerName: "Score",
            flex: 0.6,
            minWidth: 90,
        },
        {
            field: "pendingAssignments",
            headerName: "Pending Assignments",
            flex: 0.9,
            minWidth: 160,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Tooltip title="View">
                        <IconButton
                            size="small"
                            onClick={() =>
                                router.push(`/students/${params.row.id}`)
                            }
                        >
                            <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() =>
                                router.push(`/students/${params.row.id}/edit`)
                            }
                        >
                            <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            onClick={() =>
                                onDelete?.(params.row)
                            }
                        >
                            <DeleteOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <div className="table-container">
            <DataGrid
                rows={students}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                autoHeight
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                            page: 0,
                        },
                    },
                }}
                sx={{
                    border: 0,
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "var(--surface-subtle)",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 600,
                    },
                }}
            />
        </div>
    );
}
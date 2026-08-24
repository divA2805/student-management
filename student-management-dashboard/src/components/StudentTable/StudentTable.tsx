"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({
  students,
}: StudentTableProps) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
      valueGetter: (_, row) =>
        `${row.firstName} ${row.lastName}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "score",
      headerName: "Score",
      type: "number",
      width: 100,
    },
  ];

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
      />
    </div>
  );
}
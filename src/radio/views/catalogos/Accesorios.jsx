import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const Accesorios=()=> {
  return (
    <>
    <Stack direction="row" spacing={1} marginBottom={2}>
      <Button variant="outlined" startIcon={<AddCircleOutlineOutlined color="secondary" />}>
        Nuevo
      </Button>
  
    </Stack>
    <div style={{ height: 750, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
      />
    </div>
    </>
  );
}

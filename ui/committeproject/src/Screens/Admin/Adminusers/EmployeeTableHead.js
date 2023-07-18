import {Box, TableCell,TableHead,TableRow} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React from "react";

  const headCells = [
    {
      id: "UserName",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "Email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "Designation",
      numeric: true,
      disablePadding: false,
      label: "Designation",
    },
    {
      id: "DOB",
      numeric: true,
      disablePadding: false,
      label: "DOB",
    },
    {
      id: "Type",
      numeric: true,
      disablePadding: false,
      label: "Type",
    },
    {
      id: "GroupName",
      numeric: true,
      disablePadding: false,
      label: "Group Name",
    }
  ];

export default function EmployeeTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell
            style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
          />
          {headCells.map((headCell) => (
            <TableCell
              style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                // hidden
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
            style={{ backgroundColor: "rgb(155 209 242)", color: "black" }}
          />
        </TableRow>
      </TableHead>
    );
  }
import React from "react";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PendingStyles from "./PendingList.module.css";

export default function PointCommon({
  columns,
  data,
  page,
  rowsPerPage,
  title,
  status,
}) {
  return (
    <div className={PendingStyles.eventhistorycard} data-testid="point-common">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "rgb(155 209 242)",
                      color: "black",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ backgroundColor: "rgb(155 209 242)" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={row._id}
                        className={PendingStyles.accordionHover}
                      >
                        <TableCell>{row?.Eventlist[0]?.EventName}</TableCell>
                        <TableCell> {row?.grouplist[0]?.GroupName} </TableCell>
                        <TableCell> {row?.gameList[0]?.GameName} </TableCell>
                        <TableCell> {row?.TotalPoint} </TableCell>

                        <TableCell title={title}>
                          {status ? (
                            <div className={PendingStyles.spinner}></div>
                          ) : (
                            row?.Report
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "left" }}>
                    <img
                      alt="committee icon"
                      src="/favicon/logo_comittee.png"
                      className={PendingStyles.EentHistoryPageLoding}
                      width="300"
                      height="300"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

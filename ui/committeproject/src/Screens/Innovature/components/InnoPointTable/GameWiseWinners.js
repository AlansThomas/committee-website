
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Scrollbar from "../../../../components/scrollbar";
import api from "../../../../api/API_URL";
import { axiosPrivate } from "../../../../api/Interceptor/intercepter";
import pointTableStyles from "./pointTableInn.module.css";

const TABLE_HEAD = [
  { id: "id", label: "", alignRight: false },
  { id: "Game Name", label: "Game Name", alignRight: false },
  { id: "Event Name", label: "Event Name", alignRight: false },
  { id: "Winner", label: "Winner", alignRight: false },
];

export default function GameWiseWinners() {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      maxWidth: 200,
    },
  }));
  const classes = useStyles();

  const [points, setPoints] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const getGameWinners = (gameWinners) => {
    return gameWinners
      .reduce((accumulator, gameWinner) => {
        return accumulator + gameWinner?.grouplist[0]?.GroupName + ", ";
      }, "")
      .slice(0, -2);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axiosPrivate.get(api.GET_GAME_WINNERS).then((response) => {
      setPoints(response?.data);
    });
  }, []);
  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 200, maxWidth: 1600 }}>
          <Table>
            <TableRow>
              {TABLE_HEAD.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: "white",
                    backgroundColor: "#060660",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableBody className={pointTableStyles.tableContent}>
              {points.length > 0 ? (
                points
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage
                  )
                  ?.map((row, index) => {
                    return (
                      <TableRow
                        key={row}
                        className={pointTableStyles.tableItems}
                      >
                        <TableCell></TableCell>
                        <TableCell>
                          {row?.gameWinners[0]?.gamelist[0]?.GameName}
                        </TableCell>
                        <TableCell>
                          {row?.gameWinners[0]?.Eventlist[0]?.EventName}
                        </TableCell>
                        <TableCell
                          className={classes.wrapper}
                          title={getGameWinners(row?.gameWinners)}
                        >
                          {getGameWinners(row?.gameWinners)}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center" }}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <div style={{ display: "grid", justifyContent: "end" }}>
        {points?.length > 5 && (
          <Stack
            spacing={2}
            style={{ position: "relative", right: "16%", marginTop: "1%" }}
          >
            <Pagination
              siblingCount={0}
              count={points.length <= 5 ? 1 : Math.ceil(points.length / 5)}
              rowsPerPage={rowsPerPage}
              page={page}
              onChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              color="primary"
            />
          </Stack>
        )}
      </div>
    </Card>
  );
}

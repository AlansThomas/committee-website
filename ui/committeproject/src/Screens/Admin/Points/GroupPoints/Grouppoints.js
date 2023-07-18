import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
//bell icon from material ui
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  deletePub,
  pointforPublish,
  publishToInnovator,
} from "../../../../api/ServiceFile/ApiService";
import ToasterSuccessGlobal from "../../../../TosterGlobal/ToasterGlobal";
import grouppointcss from "./GroupPoints.module.css";

const columns = [
  { id: "Groups", label: "Groups", minWidth: 150 },
  { id: "Points", label: "Points", minWidth: 150 },
  { id: "Verified by", label: "Verified by", minWidth: 150 },
];
export default function Grouppoints() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    listgrouptoppoints();
  }, []);

  const handleRevert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it!",
    }).then((response) => {
      if (response.isConfirmed) {
        deletePub(id)
          .then((responses) => {
            ToasterSuccessGlobal("Point Reverted Successfully", 8912, [
              "success",
            ]);

            listgrouptoppoints();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  async function listgrouptoppoints() {
    await pointforPublish().then((response) => {
      if (response) {
        setData(response.data);
      }
    });
  }

  // edit point
  const Publishpoints = () => {
    let list = [];
    let firstcity = [];
    for (let obj of data) {
      list.push(obj._id.GroupId);
    }

    for (let id of data) {
      firstcity.push(id.first_city);
    }

    publishToInnovator(list, firstcity).then((response) => {
      ToasterSuccessGlobal("Points Published successfully!", 23345, [
        "success",
      ]);

      listgrouptoppoints();
    });
  };
  // Point Table =================================================================================================
  return (
    <>
      <Helmet>
        <title> Admin | Point Table </title>
      </Helmet>
      <Stack
        data-testid="group-points"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      ></Stack>
      <div className={grouppointcss.eventhistorycard}>
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
                          className={grouppointcss.accordionHover}
                        >
                          <TableCell>{row?.grouplist[0]?.GroupName}</TableCell>
                          <TableCell> {row?.count} </TableCell>
                          <TableCell> {row?.VerifiedBy}</TableCell>
                          {/* <Tooltip title="Revert the point" > */}
                          <TableCell title="Revert the point">
                            <IconButton
                              data-testId="delete-btn"
                              onClick={() => handleRevert(row?.first_city)}
                              color="error"
                              className={grouppointcss.deleteIcon}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          {/* </Tooltip> */}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "left" }}>
                      <img
                        alt="committee icon"
                        src="/favicon/logo_comittee.png"
                        className={grouppointcss.EentHistoryPageLoding}
                        width="300"
                        height="300"
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {data.length > 0 ? (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                data-testId="pub-Btn"
                className={grouppointcss.submitgrpointbutton}
                onClick={Publishpoints}
                type="button"
                variant="contained"
                size="small"
              >
                Publish To Innovature
              </Button>
            </div>
          ) : (
            ""
          )}

          {data.length > 0 && (
            <Stack
              spacing={2}
              style={{ position: "absolute", right: "16%", marginTop: "1%" }}
            >
              <Pagination
                siblingCount={0}
                count={data.length <= 5 ? 1 : Math.ceil(data.length / 5)}
                rowsPerPage={rowsPerPage}
                page={page}
                onChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                color="primary"
              />
            </Stack>
          )}
        </Paper>
      </div>
    </>
  );
}

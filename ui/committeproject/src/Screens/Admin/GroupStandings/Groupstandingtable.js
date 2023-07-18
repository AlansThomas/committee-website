import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getgrpPoint, grpPoint } from "../../../api/ServiceFile/ApiService";
import tablestyle from "./Groupstandings.module.css";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: 130,
  },
}));

// table headings //
const headCells = [
  {
    id: "UserName",
    numeric: false,
    disablePadding: true,
    label: "Group",
    disableSorting: true,
  },
  {
    id: "Email",
    numeric: true,
    disablePadding: false,
    label: "Point",
    disableSorting: true,
  },
];
function EnhancedTableHead(props) {
  const { orderBy } = props;
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
          >
            <TableSortLabel
              disabled={headCell.disableSorting}
              active={orderBy === headCell.id}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell style={{ backgroundColor: "rgb(155 209 242)" }} />
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// Add GRoup member routing
function EnhancedTableToolbar() {
  return <></>;
}
EnhancedTableToolbar.propTypes = {};
export default function Groupstandingtable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [data, setData] = useState([]);
  const [user] = useState({
    Group: "",
    Email: "",
  });
  const init = useRef();
  useEffect(() => {
    checkgrouptype();
  }, []);
  async function checkgrouptype() {
    await grpPoint().then((response) => {
      if (response) {
        const body = response.data;
        getgrpPoint(body).then((responses) => {
          setData(responses.data);
        });
      }
    });
  }
  init.current = user;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title> Admin | Committee </title>
      </Helmet>
      <Box sx={{}} className="col-md-12">
        <Stack
          data-testid="Group-standings"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        ></Stack>
        <div className={tablestyle.groupwisetablecard}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table sx={{ minWidth: 75 }} aria-labelledby="tableTitle">
                <EnhancedTableHead rowCount={data.length} />
                <TableBody>
                  {data.length > 0
                    ? data
                        .slice(
                          (page - 1) * rowsPerPage,
                          (page - 1) * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row._id}>
                              <TableCell />
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                                title={row?.GroupDetails?.GroupName}
                                className={classes.wrapper}
                              >
                                {row?.GroupDetails?.GroupName}
                              </TableCell>
                              <TableCell align="left">
                                <span padding="18px">{row?.TotalPoint}</span>
                                &nbsp;&nbsp;
                                {row?.Winner === "yes" ? (
                                  <img
                                    src="/favicon/crown.png"
                                    alt="crown logo"
                                    width="21"
                                    height="21"
                                    marginTop="20px"
                                    className={tablestyle.forBlock}
                                  />
                                ) : null}
                              </TableCell>
                            </TableRow>
                          );
                        })
                    : ""}
                </TableBody>
              </Table>
              {data.length == 0 && (
                <img
                  src="/favicon/logo_comittee.png"
                  alt="committee logo"
                  width="300"
                  height="300"
                  className={tablestyle.groustandingPageLoding}
                />
              )}
            </TableContainer>
            {data.length > 0 && (
              <Stack
                spacing={2}
                style={{
                  position: "absolute",
                  right: "59%",
                  marginTop: "2.4%",
                }}
              >
                <Pagination
                  siblingCount={0}
                  count={data.length <= 8 ? 1 : Math.ceil(data.length / 8)}
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
      </Box>
    </>
  );
}

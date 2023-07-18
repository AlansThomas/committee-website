import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import "./dd.css";
import feedStyles from "./feed.module.css";

const TopThree = ({ first, classes, second, third }) => {
  function renderRow(rank, imageSrc, data) {
    return data.map((p, i) => (
      <TableRow
        key={p}
        className={feedStyles.topThreeRow}
        sx={{ padding: "1px!important" }}
      >
        <TableCell
          style={{ minWidth: "1vw" }}
          sx={{ padding: "5px!important" }}
        >
          <img
            src={imageSrc}
            alt="password"
            style={{ width: "16px" }}
          />
        </TableCell>
        <TableCell
          className={classes.wrapper}
          title={p.grouplist[0]?.GroupName}
          sx={{
            padding: "7px!important",
            fontSize: ".9rem !important",
          }}
        >
          {p.grouplist[0]?.GroupName}
        </TableCell>
        <TableCell
          className={classes.wrapper}
          title={p.TotalPoint}
          sx={{
            padding: "5px!important",
            fontSize: ".9rem !important",
            width: rank === 3 ? "75px" : undefined,
          }}
        >
          {p.TotalPoint}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Table>
      <TableBody>
        <div
          style={{
            maxHeight: "120px",
            width: "100%",
            overflowY: "hidden",
            overflowX: "hidden",
            paddingRight: 5,
            marginLeft: '10px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.overflowY = "scroll";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.overflowY = "hidden";
          }}
        >
          {first.length > 0 && renderRow(1, "/assets/first.png", first)}
          {second.length > 0 && renderRow(2, "/assets/second.png", second)}
          {third.length > 0 && renderRow(3, "/assets/third.png", third)}
        </div>
      </TableBody>
    </Table>
  );

}

export default TopThree
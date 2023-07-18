import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {useSearchParams } from "react-router-dom";
import { QuatersHistory } from "../../../api/ServiceFile/ApiService";
import grouppointcss from "../Points/GroupPoints/GroupPoints.module.css";
import EventHistoryStyles from "../AllEvents/EventHisory/EventHistory.module.css";

const columns = [
  { id: "gName", label: "Group Name", minWidth: 150 },
  { id: "point", label: "Point ", minWidth: 100 },
];

export default function DetailedView() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('mange');
  const  id  = query;
  const [data, setData] = useState([]);

  const Details = () => {
    QuatersHistory(id)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    Details();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        marginLeft: "-7.8%",
        marginTop: "30px",
      }}
    >
      <div className={EventHistoryStyles.eventhistorycard}>
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
              {data?.length > 0 ? (
                data?.map((row, index) => (
                  <TableRow
                    key={index}
                    className={grouppointcss.accordionHover}
                  >
                    <TableCell>{row?.groupDetails[0]?.GroupName}</TableCell>
                    <TableCell>{row?.TotalPoint}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "left" }}>
                    <img
                      alt="committee icon"
                      src="/favicon/logo_comittee.png"
                      className={EventHistoryStyles.EentHistoryPageLoding}
                      width="300"
                      height="300"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

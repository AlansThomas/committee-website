import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ReportedPoints } from "../../../../api/ServiceFile/ApiService";
import PaginationCustom from "../../AllEvents/AllEvents/PaginationCustom";
import PointCommon from "./PointCommon";

const columns = [
  { id: "EventName", label: "Event Name", minWidth: 150 },
  { id: "GroupName", label: "Group Name", minWidth: 150 },
  { id: "GameName", label: "Game Name", minWidth: 150 },
  { id: "Point", label: "Point", minWidth: 150 },
];
export default function Reported() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const maxItemsPerPage = data.length <= 5 ? 1 : Math.ceil(data.length / 5);
  const title = "Feedback from committee";
  const status = 0;

  useEffect(() => {
    ReportedPoints().then((response) => {
      setData(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Point Table =================================================================================================
  return (
    <>
      <Helmet>
        <title> Admin | Point Table </title>
      </Helmet>
      <PointCommon
        columns={columns}
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
        title={title}
        status={status}
      />
      {data.length > 0 && (
        <PaginationCustom
          maxItemsPerPage={maxItemsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

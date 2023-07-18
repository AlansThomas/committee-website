import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FindEventgroupList,
  GetCurrentEvents,
} from "../../../../api/ServiceFile/ApiService";
import EventTable from "../AllEvents/EventTable";
import PaginationCustom from "../AllEvents/PaginationCustom";

export default function CurrentEvents() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const [PointList, setPointList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const maxItemsPerPage =
    PointList.length <= 5 ? 1 : Math.ceil(PointList.length / 5);
  useEffect(() => {
    GetCurrentEvents().then((response) => {
      setPointList(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function EventClick(id) {
    FindEventgroupList(id)
      .then((response) => {
        setGameList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Helmet>
        <title> Admin | All Events </title>
      </Helmet>
      <EventTable
        PointList={PointList}
        page={page}
        rowsPerPage={rowsPerPage}
        expanded={expanded}
        handleChange={handleChange}
        EventClick={EventClick}
        gameList={gameList}
      />

      {PointList.length > 0 && (
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

import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import GroupWiseTables from "../GroupStandings/Groupstandingtable.js";
import EventWiseTable from "../EventWisePoint/EventWisePoint";
import Chart from "react-google-charts";
import ChartCss from "./DashboardApp.module.css";
import { GraphData } from "../../../api/ServiceFile/ApiServiceAlwin.js";
export default function DashboardAppPage() {
  const profile = JSON.parse(localStorage?.getItem("Profile"));
  const UserId = profile?.data?.Email;
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    TotalScore();
  }, [UserId]);

  const colors = [
    "#4285f4",
    "#db4437",
    "#f4b400",
    "#0f9d58",
    "#9c27b0",
    "#00bcd4",
    "#ff5722",
    "#8bc34a",
    "#795548",
    "#607d8b",
    "#f44336",
    "#e91e63",
    "#9e9e9e",
    "#3f51b5",
    "#4caf50",
    "#ffc107",
    "#cddc39",
    "#2196f3",
    "#673ab7",
    "#ffeb3b",
  ];

  async function TotalScore() {
    try {
        const responses = await GraphData();
        const eventData = responses.data?.map((column, index) => [
          column?.grouplist[0]?.GroupName,
          column?.count,
          `color: ${colors[index]}`,
        ]);
        eventData.unshift([
          "Group Standing",
          "Event Points",
          { role: "style" },
        ]);
        setDatas(eventData);
      
    } catch (error) {
      // Handle any errors that occur during the API calls
      console.error(error);
    }
  }
  

  const groupGraphOptionsInModal = {
    chartArea: {
      width: "60%", // set chart area width to 80% of the chart container width
    },
    hAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 13, // set maximum font size to 14 pixels
      },
      maxTextLines: 1,
    },
    vAxis: {
      maxTextWidth: 50, // set maximum width to 80 pixels
      textStyle: {
        fontSize: 13, // set maximum font size to 14 pixels
      },
      maxTextLines: 1,
    },
    title: "Quarter year Point Chart",
    is3D: true,
    legend: "none",
    tooltip: {
      isHtml: true,
      backgroundColor: "white",
      textStyle: {
        color: "black",
      },
    },
    colors: colors,
  };

  return (
    <>
      <Helmet>
        <title>Admin | Home </title>
      </Helmet>
      <div style={{ width: "80%", marginTop: "60px" }}>
        {datas.length === 0 ? (
          <img
            src="/favicon/logo_comittee.png"
            className={ChartCss.committeePageLoading}
            alt="Image"
            width="300"
            height="300"
          />
        ) : (
          <>
            <Chart
              chartType="BarChart"
              data={datas}
              options={groupGraphOptionsInModal}
              height={"85vh"}
              fill={"black"}
            />
          </>
        )}
        <div
          style={{
            display: "inline-flex",
            marginBottom: "150px",
            width: "100%",
          }}
        >
          <div style={{ marginRight: "10px", width: "50%" }}>
            <GroupWiseTables />
          </div>
          <div style={{ width: "50%" }}>
            <EventWiseTable />
          </div>
        </div>
      </div>
    </>
  );
}



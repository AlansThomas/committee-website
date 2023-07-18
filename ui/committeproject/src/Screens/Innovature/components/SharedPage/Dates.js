import React, { useState, useEffect } from 'react';

function Dates({ props }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      console.log("timeDate");
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const dateToCompare = new Date(props.createdAt);
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86400000);

  const isToday = today.toDateString() === dateToCompare.toDateString();
  const isYesterday = yesterday.toDateString() === dateToCompare.toDateString();

  let formattedDate;

  if (isToday) {
    const timeDiff = currentTime.getTime() - dateToCompare.getTime();
    const minutesAgo = Math.floor(timeDiff / 1000 / 60);
    const hoursAgo = Math.floor(timeDiff / 1000 / 60 / 60);

    if (hoursAgo > 0) {
      formattedDate = `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else if (minutesAgo > 0) {
      formattedDate = `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else {
      formattedDate = 'just now';
    }
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${dateToCompare.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  } else {
    formattedDate = `${dateToCompare.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    })} at ${dateToCompare.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  }

  return <div style={{ letterSpacing: 0 }}>{formattedDate}</div>;
}

export default Dates;

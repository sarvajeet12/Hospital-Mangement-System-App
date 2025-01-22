import React from "react";

const DateFormate = ({ date }) => {
  const formatDate = (dateValue) => {
    const dateInString = new Date(dateValue);
    return dateInString.toISOString().split("T")[0];
  };
  return <>{formatDate(date)}</>;
};

export default DateFormate;

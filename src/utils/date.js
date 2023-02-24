export const getDateString = (date) => {
  if (date) {
    const dateInstance = new Date(date);
    return `${
      dateInstance.getMonth() + 1 < 10
        ? `0${dateInstance.getMonth() + 1}`
        : dateInstance.getMonth() + 1
    }/${
      dateInstance.getDate() < 10
        ? `0${dateInstance.getDate()}`
        : dateInstance.getDate()
    }/${dateInstance.getFullYear()}`;
  }

  return "";
};

export const getFormattedDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

// dateString must be of format yyyy-mm-dd or mm/dd/yyyy
export const getDateObject = (dateString) => {
  if (!dateString) {
    return null;
  }

  const dateMonthAndYear = getDateMonthAndYear(dateString);

  if (Object.keys(dateMonthAndYear) === 0) {
    return null;
  }

  const { year, month, date } = dateMonthAndYear;

  const dateObject = new Date();

  dateObject.setHours(0);
  dateObject.setMinutes(0);
  dateObject.setSeconds(0);
  dateObject.setMilliseconds(0);

  dateObject.setFullYear(year);
  dateObject.setMonth(month - 1);
  dateObject.setDate(date);

  return dateObject;
};

const getDateMonthAndYear = (dateString) => {
  const dateStringHyphenSplit = dateString.split("-");
  const dateStringSlashSplit = dateString.split("/");

  if (dateStringHyphenSplit.length === 3 && dateStringSlashSplit.length === 1) {
    const [year, month, date] = dateStringHyphenSplit;
    return { year, month, date };
  }

  if (dateStringSlashSplit.length === 3 && dateStringHyphenSplit.length === 1) {
    const [month, date, year] = dateStringSlashSplit;
    return { year, month, date };
  }

  return {};
};

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

export function daysBetween(startDate, endDate) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export function getToday() {
  let d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

export function getTime() {
  let d = new Date();
  let hh = d.getHours();
  let mm = d.getMinutes();
  let ss = d.getSeconds();

  return [
    (hh > 9 ? "" : "0") + hh,
    (mm > 9 ? "" : "0") + mm,
    (ss > 9 ? "" : "0") + ss,
  ].join("");
}

// import { Chart } from "react-chartjs-2";
import XLSX from "xlsx";
export * from "./token";
export * from "./date";
export { default as responseFormatter } from "./response-formatter";

export const getJSONStringForBigNumber = (JSONString) =>
  JSON.parse(JSONString.replace(/\":([\d]+)/gm, '":"$1"'));

export function getChartColorCode(colorText) {
  let chartColorCode = "#000000";
  colorText = colorText.toLowerCase();

  if (colorText == "yellow") {
    chartColorCode = "#fcd65d";
  } else if (colorText == "cyan") {
    chartColorCode = "#4280fe";
  } else if (colorText == "magenta") {
    chartColorCode = "#dd3d47";
  }

  return chartColorCode;
}

export const writeXLSFile = async (id, sheetName = "Sheet") => {
  let workBook = XLSX.utils.table_to_book(document.getElementById(id));
  XLSX.writeFile(workBook, `${sheetName}.xlsx`);
};

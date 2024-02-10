import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function downloadExcel(rows, columns, name, rcname) {
  const wb = new ExcelJS.Workbook();
  wb.creator = name;
  wb.lastModifiedBy = name;
  wb.created = new Date();
  wb.lastPrinted = new Date();
  wb.modified = new Date();
  const ws = wb.addWorksheet("Sheet 1");

  const headers = columns.map((column) => column.headerName);
  ws.addRow(headers);

  rows.forEach((row) => {
    const rowData = columns.map((column) => {
      const { field } = column;
      return row[field] || "";
    });
    ws.addRow(rowData);
  });

  wb.xlsx.writeBuffer().then((excelBuffer) => {
    saveAs(new Blob([excelBuffer]), `${rcname}.xlsx`);
  });
}

export default downloadExcel;

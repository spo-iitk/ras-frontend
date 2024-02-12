import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function downloadExcel(
  rows: any[],
  columns: any[],
  name: string,
  user_id: string
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = `${name} | ${user_id}`;
  wb.lastModifiedBy = name;
  wb.created = new Date();
  wb.lastPrinted = new Date();
  wb.modified = new Date();
  const ws = wb.addWorksheet("Sheet 1");

  const headers = columns.map(
    (column: { headerName: any }) => column.headerName
  );
  ws.addRow(headers);

  rows.forEach((row: { [x: string]: any }) => {
    const rowData = columns.map((column: { field: any }) => {
      const { field } = column;
      return row[field] || "";
    });
    ws.addRow(rowData);
  });

  wb.xlsx.writeBuffer().then((excelBuffer) => {
    saveAs(new Blob([excelBuffer]), `data.xlsx`);
  });
}

export default downloadExcel;

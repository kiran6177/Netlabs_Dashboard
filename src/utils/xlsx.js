import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function downloadExcel(table,cols,filename){
    const worksheet = XLSX.utils.table_to_sheet(table);
    
    worksheet['!cols'] = cols.map(col=>({wch : col}))

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
}
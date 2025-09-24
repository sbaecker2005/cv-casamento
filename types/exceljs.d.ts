declare module 'exceljs' {
  namespace ExcelJS {
    interface WorksheetColumn {
      header?: string;
      key?: string;
      width?: number;
    }
    interface Worksheet {
      columns: WorksheetColumn[];
      addRow(row: Record<string, any>): void;
    }
    interface Workbook {
      addWorksheet(name: string): Worksheet;
      xlsx: { writeBuffer(): Promise<ArrayBuffer> };
    }
  }
  const ExcelJS: {
    new (): ExcelJS.Workbook;
  };
  export default ExcelJS;
}

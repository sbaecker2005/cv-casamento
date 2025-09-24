declare module 'exceljs' {
  export interface WorksheetColumn {
    header?: string;
    key?: string;
    width?: number;
  }
  export interface Worksheet {
    columns: WorksheetColumn[];
    addRow(row: Record<string, any>): void;
  }
  export interface Workbook {
    addWorksheet(name: string): Worksheet;
    xlsx: { writeBuffer(): Promise<ArrayBuffer> };
  }
  const ExcelJS: {
    Workbook: new () => Workbook;
  };
  export default ExcelJS;
}

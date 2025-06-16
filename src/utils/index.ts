import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import * as XLSX from "xlsx";

/**
 * Export data to Excel using dynamic column keys.
 *
 * @param columns - Array of column keys from T.
 * @param data - Array of objects of type T.
 * @param filename - Desired filename (without extension).
 * @example
 * const columns = ["CompanyId", "CompanyName", "Email", "PhoneNumber"] as const;
 * const data = [{ CompanyId: "1", CompanyName: "ABC Corp", Email: "c@gmail.com", PhoneNumber: "1234567890" }, ...];
 * exportToExcel(columns, data, "companies");
 */
export const exportToExcel = <T extends Record<string, string>, K extends keyof T>(
  columns: readonly K[],
  data: T[],
  filename: string
): void => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(row =>
        columns.reduce((acc, key) => {
          acc[key as string] = row[key];
          return acc;
        }, {} as Record<string, unknown>)
      ),
      { header: columns as [] }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error("Failed to export to Excel:", error);
    toast.error("Failed to export to Excel");
  }
};

/**
 * Export data to PDF using jsPDF and autoTable.
 *
 * @param columns - Array of column keys from T.
 * @param data - Array of objects of type T.
 * @param filename - Desired filename (without extension).
 * @example
 * const columns = ["CompanyId", "CompanyName", "Email", "PhoneNumber"] as const;
 * const data = [{ CompanyId: "1", CompanyName: "ABC Corp", Email: "c@gmail.com", PhoneNumber: "1234567890" }, ...];
 * exportToPDF(columns, data, "companies");
 */
export const exportToPDF = <T extends Record<string, string>, K extends keyof T>(
  columns: readonly K[],
  data: T[],
  filename: string
): void => {
  try {
    const doc = new jsPDF();

    const tableHead = columns.map(String);

    const tableBody = data.map(row =>
      columns.map(key => String(row[key] ?? ""))
    );

    autoTable(doc, {
      head: [tableHead],
      body: tableBody,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [13, 175, 220] as const },
    });

    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Failed to export to PDF:", error);
    toast.error("Failed to export to PDF");
  }
};

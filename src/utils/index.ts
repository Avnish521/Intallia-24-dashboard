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
export const exportToExcel = <
  T extends Record<string, string>,
  K extends keyof T,
>(
  columns: readonly K[],
  data: T[],
  filename: string,
): void => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row) =>
        columns.reduce((acc, key) => {
          acc[key as string] = row[key];
          return acc;
        }, {} as Record<string, unknown>),
      ),
      { header: columns as [] },
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
export const exportToPDF = <
  T extends Record<string, string>,
  K extends keyof T,
>(
  columns: readonly K[],
  data: T[],
  filename: string,
): void => {
  try {
    const doc = new jsPDF();

    const tableHead = columns.map(String);

    const tableBody = data.map((row) =>
      columns.map((key) => String(row[key] ?? "")),
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

/**
 * Store user data in localStorage.
 *
 * @param userData - Object containing user data to be stored.
 * @example
 * storeUserData({ firstName: "John", lastName: "Doe", email: "test@gmail.com", contactNumber: "1234567890" });
 * This will store each property of userData in localStorage as a JSON string.
 */

export const storeUserData = (key: string, userData: object): void => {
  try {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to store user data:", error);
  }
};

// getUserData function to retrieve user data from localStorage
export const getUserData = (key: string) => {
  const userData = localStorage.getItem(key);
  return userData ? JSON.parse(userData) : null;
};

export const clearAuthStorage = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Returns paginated data and pagination info for any array.
 *
 * @param data - Array of items to paginate.
 * @param page - Current page number (1-based).
 * @param perPage - Number of items per page.
 * @returns Object with displayed items, start/end index, and total pages.
 * @example
 * const { displayedItems, startIndex, endIndex, totalPages } = getPaginatedData(users, 1, 10);
 */
export function getPaginatedData<T>(
  data: T[],
  page: number,
  perPage: number,
): {
  displayedItems: T[];
  startIndex: number;
  endIndex: number;
  totalPages: number;
} {
  const totalPages = Math.max(1, Math.ceil(data.length / perPage));
  const startIndex = Math.max(0, (page - 1) * perPage);
  const endIndex = Math.min(startIndex + perPage, data.length);
  const displayedItems = data.slice(startIndex, endIndex);
  return { displayedItems, startIndex, endIndex, totalPages };
}

// src/utils/exportToExcel.js
import * as XLSX from "xlsx";

export const exportToExcel = (expenses, farmName) => {
  const worksheet = XLSX.utils.json_to_sheet(
    expenses.map((expense) => ({
      Date: expense.date.toDate().toLocaleDateString(),
      Category: expense.category,
      "Sub Category": expense.subCategory,
      Description: expense.description,
      Amount: expense.amount,
      "Payment Status": expense.paymentStatus,
      "Payment Mode": expense.paymentMode,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

  XLSX.writeFile(workbook, `${farmName}_Expenses.xlsx`);
};

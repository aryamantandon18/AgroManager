// src/components/Expenses/ExpensePrintView.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

export default function ExpensePrintView({
  open,
  onClose,
  expenses,
  farmName,
}) {
  const handlePrint = () => {
    window.print();
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          "@media print": {
            width: "100%",
            height: "100%",
            margin: 0,
            padding: "20px",
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Expense Report</Typography>
        <Typography variant="subtitle1">
          {new Date().toLocaleDateString()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5">{farmName}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Total Expenses: ₹{totalAmount.toLocaleString()}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {expense.date.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell align="right">
                  ₹{expense.amount.toLocaleString()}
                </TableCell>
                <TableCell>{expense.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions sx={{ "@media print": { display: "none" } }}>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handlePrint} variant="contained">
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
}

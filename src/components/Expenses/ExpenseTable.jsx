// src/components/Expenses/ExpenseTable.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function ExpenseTable({ expenses, farmId, onExpenseUpdated }) {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, expense) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expense);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedExpense || !farmId) return;

    setLoading(true);
    try {
      console.log(
        "Deleting expense:",
        selectedExpense.id,
        "from farm:",
        farmId
      ); // Debug log

      const expenseRef = doc(
        db,
        `users/${currentUser.uid}/farms/${farmId}/expenses/${selectedExpense.id}`
      );

      await deleteDoc(expenseRef);
      setDeleteDialogOpen(false);
      onExpenseUpdated(); // Refresh the expense list
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Failed to delete expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount (₹)</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(expenses || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.subCategory}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {expense.description || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {expense.amount?.toLocaleString() || "0"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={expense.paymentStatus}
                      size="small"
                      color={getPaymentStatusColor(expense.paymentStatus)}
                    />
                  </TableCell>
                  <TableCell>{expense.paymentMode}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, expense)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {(!expenses || expenses.length === 0) && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    No expenses found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={expenses?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedExpense(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Expense"
        content={`Are you sure you want to delete this expense of ₹${
          selectedExpense?.amount?.toLocaleString() || 0
        }?`}
        loading={loading}
      />

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

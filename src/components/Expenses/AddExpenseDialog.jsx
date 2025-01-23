// src/components/Expenses/AddExpenseDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  expenseCategories,
  paymentModes,
  paymentStatuses,
} from "../../constants/expenses";

export default function AddExpenseDialog({
  open,
  onClose,
  farmId,
  onExpenseAdded,
}) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    amount: "",
    date: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
    description: "",
    paymentStatus: "Pending",
    paymentMode: "Cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farmId) return;

    setLoading(true);
    setError("");

    try {
      const expenseData = {
        ...formData,
        amount: Number(formData.amount),
        date: new Date(formData.date),
        farmId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const expensesRef = collection(
        db,
        `users/${currentUser.uid}/farms/${farmId}/expenses`
      );
      await addDoc(expensesRef, expenseData);

      setSuccess(true);
      onExpenseAdded && onExpenseAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      category: "",
      subCategory: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      paymentStatus: "Pending",
      paymentMode: "Cash",
    });
    setError("");
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>Add New Expense</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {Object.keys(expenseCategories).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required disabled={!formData.category}>
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    label="Sub Category"
                  >
                    {formData.category &&
                      expenseCategories[formData.category].map((subCat) => (
                        <MenuItem key={subCat} value={subCat}>
                          {subCat}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="amount"
                  label="Amount"
                  type="number"
                  fullWidth
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Payment Status</InputLabel>
                  <Select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    label="Payment Status"
                  >
                    {paymentStatuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Payment Mode</InputLabel>
                  <Select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    label="Payment Mode"
                  >
                    {paymentModes.map((mode) => (
                      <MenuItem key={mode} value={mode}>
                        {mode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Adding..." : "Add Expense"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={() => {
          setError("");
          setSuccess(false);
        }}
      >
        <Alert
          severity={error ? "error" : "success"}
          variant="filled"
          onClose={() => {
            setError("");
            setSuccess(false);
          }}
        >
          {error || "Expense added successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}

// src/pages/ReportsAnalytics.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import ExpenseAnalysis from "../components/Reports/ExpenseAnalysis";
import CategoryAnalysis from "../components/Reports/CategoryAnalysis";
import MonthlyTrends from "../components/Reports/MonthlyTrends";
import PaymentAnalysis from "../components/Reports/PaymentAnalysis";

export default function Reports() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Fetch farms
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const farmsRef = collection(db, `users/${currentUser.uid}/farms`);
        const querySnapshot = await getDocs(farmsRef);
        const farmsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFarms(farmsData);
      } catch (error) {
        console.error("Error fetching farms:", error);
        setError("Failed to load farms");
      }
    };

    fetchFarms();
  }, [currentUser.uid]);

  // Fetch expenses when farm is selected
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!selectedFarm) {
        setExpenses([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const expensesRef = collection(
          db,
          `users/${currentUser.uid}/farms/${selectedFarm}/expenses`
        );
        const querySnapshot = await getDocs(expensesRef);
        const expensesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [currentUser.uid, selectedFarm]);

  return (
    <Box>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Reports & Analytics
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Farm</InputLabel>
                <Select
                  value={selectedFarm}
                  onChange={(e) => setSelectedFarm(e.target.value)}
                  label="Select Farm"
                >
                  <MenuItem value="">
                    <em>Select a farm</em>
                  </MenuItem>
                  {farms.map((farm) => (
                    <MenuItem key={farm.id} value={farm.id}>
                      {farm.farmName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : selectedFarm && expenses.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExpenseAnalysis expenses={expenses} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryAnalysis expenses={expenses} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PaymentAnalysis expenses={expenses} />
          </Grid>
          <Grid item xs={12}>
            <MonthlyTrends expenses={expenses} />
          </Grid>
        </Grid>
      ) : selectedFarm ? (
        <Alert severity="info">No expenses found for the selected farm.</Alert>
      ) : (
        <Alert severity="info">Please select a farm to view analytics.</Alert>
      )}
    </Box>
  );
}

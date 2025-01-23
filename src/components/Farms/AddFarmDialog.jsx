// src/components/Farms/AddFarmDialog.jsx
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
import { crops } from "../../constants/crops";

const seasons = ["Kharif", "Rabi", "Zaid"];
const stages = ["Land Preparation", "Sowing", "Growing", "Harvesting"];
const areaUnits = ["Acres", "Guntas"];

export default function AddFarmDialog({ open, onClose, onFarmAdded }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    farmName: "",
    village: "",
    mandal: "",
    district: "",
    totalArea: "",
    areaUnit: "Acres",
    cropCategory: "",
    cropType: "",
    season: "",
    currentStage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cropCategory" ? { cropType: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const farmData = {
        ...formData,
        totalArea: Number(formData.totalArea),
        status: "Active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const farmsRef = collection(db, `users/${currentUser.uid}/farms`);
      await addDoc(farmsRef, farmData);

      setSuccess(true);
      onFarmAdded && onFarmAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding farm:", error);
      setError("Failed to add farm. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      farmName: "",
      village: "",
      mandal: "",
      district: "",
      totalArea: "",
      areaUnit: "Acres",
      cropCategory: "",
      cropType: "",
      season: "",
      currentStage: "",
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
        <DialogTitle>Add New Farm</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="farmName"
                  label="Farm Name"
                  fullWidth
                  required
                  value={formData.farmName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="village"
                  label="Village"
                  fullWidth
                  required
                  value={formData.village}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="mandal"
                  label="Mandal"
                  fullWidth
                  required
                  value={formData.mandal}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="district"
                  label="District"
                  fullWidth
                  required
                  value={formData.district}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="totalArea"
                  label="Total Area"
                  type="number"
                  fullWidth
                  required
                  value={formData.totalArea}
                  onChange={handleChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Area Unit</InputLabel>
                  <Select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    label="Area Unit"
                  >
                    {areaUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Crop Category</InputLabel>
                  <Select
                    name="cropCategory"
                    value={formData.cropCategory}
                    onChange={handleChange}
                    label="Crop Category"
                  >
                    {Object.keys(crops).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  disabled={!formData.cropCategory}
                >
                  <InputLabel>Crop Type</InputLabel>
                  <Select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    label="Crop Type"
                  >
                    {formData.cropCategory &&
                      crops[formData.cropCategory].map((crop) => (
                        <MenuItem key={crop} value={crop}>
                          {crop}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Season</InputLabel>
                  <Select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    label="Season"
                  >
                    {seasons.map((season) => (
                      <MenuItem key={season} value={season}>
                        {season}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Current Stage</InputLabel>
                  <Select
                    name="currentStage"
                    value={formData.currentStage}
                    onChange={handleChange}
                    label="Current Stage"
                  >
                    {stages.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Adding..." : "Add Farm"}
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
          {error || "Farm added successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}

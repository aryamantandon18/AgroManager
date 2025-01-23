// src/components/Farms/EditFarmDialog.jsx
import React, { useState, useEffect } from "react";
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
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { crops } from "../../constants/crops";

const seasons = ["Kharif", "Rabi", "Zaid"];
const stages = ["Land Preparation", "Sowing", "Growing", "Harvesting"];
const areaUnits = ["Acres", "Guntas"];

export default function EditFarmDialog({ open, onClose, farm, onFarmUpdated }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialized, setInitialized] = useState(false);

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

  useEffect(() => {
    if (farm && !initialized) {
      const category = Object.keys(crops).find((cat) =>
        crops[cat].includes(farm.cropType)
      );

      const newFormData = {
        farmName: farm.farmName || "",
        village: farm.village || "",
        mandal: farm.mandal || "",
        district: farm.district || "",
        totalArea: farm.totalArea || "",
        areaUnit: farm.areaUnit || "Acres",
        cropCategory: category || "",
        cropType: farm.cropType || "",
        season: farm.season || "",
        currentStage: farm.currentStage || "",
      };

      setFormData(newFormData);
      setInitialized(true);
    }
  }, [farm, initialized]);

  useEffect(() => {
    if (!open) {
      setInitialized(false);
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
    }
  }, [open]);

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
    if (!farm?.id) return;

    setLoading(true);
    setError("");

    try {
      const farmRef = doc(db, `users/${currentUser.uid}/farms/${farm.id}`);
      const updateData = {
        farmName: formData.farmName.trim(),
        village: formData.village.trim(),
        mandal: formData.mandal.trim(),
        district: formData.district.trim(),
        totalArea: Number(formData.totalArea),
        areaUnit: formData.areaUnit,
        cropType: formData.cropType,
        season: formData.season,
        currentStage: formData.currentStage,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(farmRef, updateData);
      setSuccess(true);
      onFarmUpdated && onFarmUpdated();
      handleClose();
    } catch (error) {
      console.error("Error updating farm:", error);
      setError("Failed to update farm. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError("");
    setInitialized(false);
  };

  if (!initialized && farm) {
    return null;
  }

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
        <DialogTitle>Edit Farm</DialogTitle>
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
              {loading ? "Updating..." : "Update Farm"}
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
          {error || "Farm updated successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}

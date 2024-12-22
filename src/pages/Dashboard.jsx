import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CustomModal from "../helper/CustomModal";

// DataList component for listing saved data
const DataList = ({ savedData, filter }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {savedData
        ?.filter(({ value }) => (filter ? value.propertyType === filter : true))
        .map(({ key, value }) => {
          const {
            inputData,
            sizeData,
            priceData,
            propertyType,
            propertyType2,
          } = value;
          const name = inputData || "N/A";

          return (
            <Typography key={key} variant="body1" sx={{ mt: 1 }}>
              <strong>Name:</strong> {name} <br />
              <strong>Size:</strong> {sizeData || "N/A"} <br />
              <strong>Price:</strong> {priceData || "N/A"} <br />
              <strong>Property Type:</strong> {propertyType || "N/A"} <br />
              <strong>Rent Type:</strong> {propertyType2 || "N/A"} <br />
            </Typography>
          );
        })}
    </Box>
  );
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [modalKey, setModalKey] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadSavedData = () => {
      const keys = Object.keys(localStorage);
      const data = keys.map((key) => {
        const item = localStorage.getItem(key);
        return {
          key,
          value: item ? JSON.parse(item) : {},
        };
      });
      setSavedData(data);
    };
    loadSavedData();
  }, []);

  const handleOpen = () => {
    const newKey = `data-${Date.now()}`;
    setModalKey(newKey);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDataUpdate = (
    inputData,
    sizeData,
    priceData,
    propertyType,
    propertyType2,
    key
  ) => {
    const updatedData = {
      inputData,
      sizeData,
      priceData,
      propertyType,
      propertyType2,
    };
    localStorage.setItem(key, JSON.stringify(updatedData));
    setSavedData((prevData) => {
      const existingIndex = prevData.findIndex((item) => item.key === key);
      if (existingIndex !== -1) {
        const updatedList = [...prevData];
        updatedList[existingIndex].value = updatedData;
        return updatedList;
      }
      return [...prevData, { key, value: updatedData }];
    });
    setModalKey("");
    setOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {/* Empty space to push the right side */}
      <Grid item xs={12} md={8}>
        <h1>hellow.</h1>
      </Grid>

      {/* Right side - box aligned to the far right */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "450px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 3,
            padding: 3,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter by Property Type</InputLabel>
            <Select
              value={filter}
              label="Filter by Property Type"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              alignSelf: "flex-end",
            }}
          >
            Open Modal for New Data
          </Button>

          <DataList savedData={savedData} filter={filter} />
        </Box>

        <CustomModal
          open={open}
          handleClose={handleClose}
          handleDataUpdate={handleDataUpdate}
          modalKey={modalKey}
        />
      </Grid>
    </Grid>
  );
}

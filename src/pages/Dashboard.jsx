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
  CssBaseline,
} from "@mui/material";
import CustomModal from "../helper/CustomModal";
import { AttachMoney, CropDin } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { Card, CardContent } from "@mui/material";

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
            locationData,
            contactData,
            propertyType,
            propertyType2,
            checkInDate,
            checkOutDate,
          } = value;
          const name = inputData || "N/A";

          return (
            <Box
              key={key}
              sx={{
                backgroundColor: "white",
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {name}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CropDin sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    <strong>Size:</strong> {sizeData || "N/A"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <AttachMoney sx={{ mr: 1, color: "blue" }} />
                  <Typography variant="body2">
                    <strong>Price:</strong> {priceData || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Property Type:</strong> {propertyType || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Rent Type:</strong> {propertyType2 || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Location:</strong> {locationData || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Contact:</strong> {contactData || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>checkInDate:</strong> {checkInDate || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>checkOutDate:</strong> {checkOutDate || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
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
  console.log(savedData.length, "saved data...");

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

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
    locationData,
    contactData,
    propertyType,
    propertyType2,
    checkInDate,
    checkOutDate,
    key
  ) => {
    const updatedData = {
      inputData,
      sizeData,
      priceData,
      locationData,
      contactData,
      propertyType,
      propertyType2,
      checkInDate,
      checkOutDate,
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

  const aggregatedData = savedData.reduce((acc, { value }) => {
    const propertyType = value.propertyType || "Unknown";
    if (acc[propertyType]) {
      acc[propertyType] += 1; // Increment count for existing property type
    } else {
      acc[propertyType] = 1; // Initialize new entry
    }
    return acc;
  }, {});

  // Convert to array format required by PieChart
  const chartData = Object.entries(aggregatedData).map(
    ([label, value], index) => ({
      id: index,
      value,
      label,
    })
  );

  const activeCount = savedData.reduce((count, { value }) => {
    return value.propertyType2 === "Available" ? count + 1 : count;
  }, 0);

  const checkin = savedData.reduce((count, { value }) => {
    return value.checkInDate !== null ? count + 1 : count;
  }, 0);

  const checkOut = savedData.reduce((count, { value }) => {
    return value.checkOutDate !== null ? count + 1 : count;
  }, 0);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            marginRight: "2%",
          }}
        >
          <Button onClick={() => setDarkMode(!darkMode)} variant="contained">
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 1,
            margin: "0 2% 0 2%",
          }}
        >
          {[
            { label: "Total Properties", value: savedData.length },
            { label: "Total Active Rent", value: activeCount },
            { label: "Check In", value: checkin },
            { label: "Check Out", value: checkOut },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                minWidth: "150px",
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 2,
                padding: 2,
                margin: "0 8px",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {item.label}
              </Typography>
              <Typography variant="h6">{item.value}</Typography>
              <Box
                sx={{
                  height: 4,
                  background:
                    "linear-gradient(to right, #FF5733, #33FF57, #3357FF)",
                  mt: 0.5,
                }}
              />
            </Box>
          ))}
        </Box>

        <Grid container spacing={2} sx={{ padding: 2 }}>
          {/* Empty space to push the right side */}

          <Grid item xs={12} md={8}>
            <PieChart
              sx={{
                "--my-custom-pattern": "url(#Pattern)",
              }}
              series={[
                {
                  data: chartData,
                },
              ]}
              width={800}
              height={400}
            >
              <pattern
                id="Pattern"
                patternUnits="userSpaceOnUse"
                width="20"
                height="40"
                patternTransform="scale(0.5)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="pink" />
                <path
                  d="M0 30h20L10 50zm-10-20h20L0 30zm20 0h20L20 30zM0-10h20L10 10z"
                  strokeWidth="1"
                  stroke="#81b2e4"
                  fill="none"
                />
              </pattern>
            </PieChart>
          </Grid>

          {/* Right side - box aligned to the far right */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 3,
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
                Add your info.
              </Button>

              <DataList savedData={savedData} filter={filter} />
            </Box>

            <CustomModal
              open={open}
              handleClose={handleClose}
              onDataUpdate={handleDataUpdate} // Change this line
              modalKey={modalKey}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

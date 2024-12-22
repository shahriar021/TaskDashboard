import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import CustomModal from "../helper/CustomModal";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [savedData, setSavedData] = useState([]); // State to store multiple data entries
  const [modalKey, setModalKey] = useState(""); // Store key for each data entry

  // Load all saved data from localStorage on mount
  useEffect(() => {
    const keys = Object.keys(localStorage); // Get all keys from localStorage
    const data = keys.map((key) => {
      const item = localStorage.getItem(key);
      return {
        key,
        value: item ? JSON.parse(item) : {}, // Parse stored object
      };
    });
    setSavedData(data);
  }, []);

  const handleOpen = () => {
    const newKey = `data-${Date.now()}`;
    setModalKey(newKey); // Set the key for the modal when opened
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

    // Save new data to localStorage
    localStorage.setItem(key, JSON.stringify(updatedData));

    // Update the list by adding new entry or updating existing one
    setSavedData((prevData) => {
      const existingIndex = prevData.findIndex((item) => item.key === key);
      if (existingIndex !== -1) {
        // Update if key exists
        const updatedList = [...prevData];
        updatedList[existingIndex].value = updatedData;
        return updatedList;
      }
      // Add new entry if key does not exist
      return [...prevData, { key, value: updatedData }];
    });

    setModalKey(""); // Reset modal key
    setOpen(false); // Close the modal
  };

  return (
    <div style={{ padding: "2%" }}>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal for New Data
      </Button>
      return (
      <div style={{ padding: "2%" }}>
        <Button variant="contained" onClick={handleOpen}>
          Open Modal for New Data
        </Button>

        {savedData.filter.include("Apartment")(({ key, value }) => {
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

        <CustomModal
          open={open}
          handleClose={handleClose}
          onDataUpdate={handleDataUpdate}
          title="Add your details."
          content="This is a sample modal using Material UI."
          key={modalKey}
          modalKey={modalKey}
        />
      </div>
      );
      <CustomModal
        open={open}
        handleClose={handleClose}
        onDataUpdate={handleDataUpdate}
        title="Add your details."
        content="This is a sample modal using Material UI."
        key={modalKey}
        modalKey={modalKey}
      />
    </div>
  );
}

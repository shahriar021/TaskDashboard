import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CustomModal = ({ open, handleClose, onDataUpdate, modalKey }) => {
  const [inputData, setInputData] = useState("");
  const [sizeData, setSize] = useState("");
  const [priceData, setPrice] = useState("");
  const [LocationData, setLocation] = useState("");
  const [ContactData, setContact] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyType2, setPropertyType2] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    if (modalKey) {
      const existingData = localStorage.getItem(modalKey);
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        setInputData(parsedData.inputData || "");
        setSize(parsedData.sizeData || "");
        setPrice(parsedData.priceData || "");
        setLocation(parsedData.LocationData || "");
        setContact(parsedData.ContactData || "");
        setPropertyType(parsedData.propertyType || "");
        setPropertyType2(parsedData.propertyType2 || "");
        setCheckInDate(parsedData.checkInDate || "");
        setCheckOutDate(parsedData.checkOutDate || "");
      } else {
        setInputData("");
        setSize("");
        setPrice("");
        setLocation("");
        setContact("");
        setPropertyType("");
        setPropertyType2("");
        setCheckInDate("");
        setCheckOutDate("");
      }
    }
  }, [modalKey]);

  const handleSave = () => {
    const dataToSave = {
      inputData,
      sizeData,
      priceData,
      LocationData,
      ContactData,
      propertyType,
      propertyType2,
      checkInDate,
      checkOutDate,
    };
    if ((modalKey && LocationData.trim() === "") || ContactData.trim() === "") {
      alert("Fill up required fields");
      return;
    }
    localStorage.setItem(modalKey, JSON.stringify(dataToSave));

    onDataUpdate(
      inputData,
      sizeData,
      priceData,
      LocationData,
      ContactData,
      propertyType,
      propertyType2,
      checkInDate,
      checkOutDate,
      modalKey
    );

    handleClose();
  };

  const handleRadioChange = (event) => {
    setPropertyType(event.target.value);
    setActiveGroup("propertyType");
  };

  const handleRadioChange2 = (event) => {
    setPropertyType2(event.target.value);
    setActiveGroup("propertyType2");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6">Add your details</Typography>
        

        <TextField
          label="Enter Data"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <TextField
          label="Enter Size"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={sizeData}
          onChange={(e) => setSize(e.target.value)}
        />
        <TextField
          label="Enter Price"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={priceData}
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          label="Check-in Date"
          fullWidth
          type="date"
          variant="outlined"
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />

        <TextField
          label="Check-out Date"
          fullWidth
          type="date"
          variant="outlined"
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />

        <TextField
          label="Enter Location"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={LocationData}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Typography sx={{ color: "red", fontSize: 10 }}>
          *required fields
        </Typography>

        <TextField
          label="Enter Contact"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          value={ContactData}
          onChange={(e) => setContact(e.target.value)}
        />
        <Typography sx={{ color: "red", fontSize: 10 }}>
          *required fields
        </Typography>

        {activeGroup !== "propertyType2" && (
          <RadioGroup
            row
            value={propertyType}
            onChange={handleRadioChange}
            sx={{ margin: 2 }}
          >
            <FormControlLabel
              value="Apartment"
              control={<Radio />}
              label="Apartment"
            />
            <FormControlLabel value="House" control={<Radio />} label="House" />
            <FormControlLabel
              value="Commercial"
              control={<Radio />}
              label="Commercial"
            />
          </RadioGroup>
        )}

        {activeGroup !== "propertyType" && (
          <>
            <Typography sx={{ mt: 2 }}>Is it for Rent?</Typography>
            <RadioGroup
              row
              value={propertyType2}
              onChange={handleRadioChange2}
              sx={{ margin: 2 }}
            >
              <FormControlLabel
                value="Available"
                control={<Radio />}
                label="Available"
              />
              <FormControlLabel
                value="Rented"
                control={<Radio />}
                label="Rented"
              />
            </RadioGroup>
          </>
        )}

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;

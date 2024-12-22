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
  const [propertyType, setPropertyType] = useState("");
  const [propertyType2, setPropertyType2] = useState("");
  const [activeGroup, setActiveGroup] = useState(null);

  // Load existing data from localStorage when the modal is opened
  useEffect(() => {
    if (modalKey) {
      const existingData = localStorage.getItem(modalKey);
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        setInputData(parsedData.inputData || "");
        setSize(parsedData.sizeData || "");
        setPrice(parsedData.priceData || "");
        setPropertyType(parsedData.propertyType || "");
        setPropertyType2(parsedData.propertyType2 || "");
      } else {
        setInputData("");
        setSize("");
        setPrice("");
        setPropertyType("");
        setPropertyType2("");
      }
    }
  }, [modalKey]);

  const handleSave = () => {
    const dataToSave = {
      inputData,
      sizeData,
      priceData,
      propertyType,
      propertyType2,
    };
    localStorage.setItem(modalKey, JSON.stringify(dataToSave));
    onDataUpdate(
      inputData,
      sizeData,
      priceData,
      propertyType,
      propertyType2,
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
        }}
      >
        <Typography variant="h6">Add your details</Typography>
        <Typography sx={{ mt: 2 }}>
          This is a sample modal using Material UI.
        </Typography>

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

        {activeGroup !== "propertyType2" && (
          <RadioGroup row value={propertyType} onChange={handleRadioChange}>
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
            <RadioGroup row value={propertyType2} onChange={handleRadioChange2}>
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

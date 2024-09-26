import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Grid,
  
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";



const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newValues = [...values];
    newValues[index][name] = value;
    setValues(newValues);
  };

  const validate = () => {
    const newErrors = values.map((row, index) => {
      console.log(row);
      const rowErrors = {};
      if (!row.particulars) rowErrors.particulars = "Particulars is required";
      if (!row.quantity) rowErrors.quantity = "Quantity is required";
      if (!row.price) rowErrors.price = "Price is required";
      if(index===0){
      if (!row.name) rowErrors.name = "Name is required";
      if (!row.addressLine1)
        rowErrors.addressLine1 = "Address Line 1 is required";
      if (!row.city) rowErrors.city = "City is required";
      if (!row.state) rowErrors.state = "State is required";
      if (!row.pincode) rowErrors.pincode = "Pincode is required";
      if (!row.gstin) rowErrors.gstin = "GSTIN is required";
      if (!row.cgst) rowErrors.cgst = "CGST is required";
      if (!row.sgst) rowErrors.sgst = "SGST is required";
}
      return rowErrors;
    });

    setErrors(newErrors);
    return newErrors.every((rowErrors) => Object.keys(rowErrors).length === 0);
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};

export default function ManageSalesForm() {
  
  const initialFormState = [
    {
      particulars: "",
      quantity: "",
      price: "",
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      gstin: "",
      cgst: "",
      sgst: "",
      index:"2"
    },
  ];

  const { values, errors, handleChange, validate, setErrors, setValues } =
    useFormValidation(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleAddRow = () => {
    setValues([
      ...values,
      {
        particulars: "",
        quantity: "",
        price: "",

      },
    ]);
  };

  const handleDeleteRow = (index) => {
    if (values.length > 1) {
      setValues(values.filter((_, i) => i !== index));
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);

    
    try {
        const { name, addressLine1, addressLine2, city, state, pincode, gstin, cgst, sgst } = values[0];
        const partyData = { name, addressLine1, addressLine2, city, state, pincode, gstin, cgst, sgst };
        const invoiceData = values.map(({ particulars, quantity, price }) => ({ particulars, quantity, price }));
      

        let saleId;
        
        // Store party data first
        const partyResponse = await axiosClient.post('/manage-sale/store', values);
       
        
        saleId = partyResponse.data.id;

        // Store invoice data if saleId is available
        if (saleId) {
            await axiosClient.post(`/manage-sale/store-invoice/${saleId}`, invoiceData);
        }
        

        // Navigate after successful insertion
        navigate('/manage_sales', { state: { message: saleId ? 'Item updated successfully!' : 'Item created successfully!' } });
    } catch (err) {
        if (err.response) {
            const response = err.response;
            if (response.status === 422) {
                setErrors(response.data.errors);
            }
        }
        console.log('Error config:', err.config);
    } finally {
        setLoading(false);
    }
};
// console.log("valuess"  ,values);


  return (
    <div style={{ padding: "2%" }} className="item-form">
      <div className="item-form-inlayout">
        <div className="item-form-title">
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Manage Sales
          </h2>
        </div>
        <div style={{ padding: "1%" }} className="item-inner-form">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mt: 1, width: "100%" },
              "& .MuiFormControl-root": { mt: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {values.map((row, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    id={`particulars-${index}`}
                    name="particulars"
                    value={row.particulars}
                    onChange={(e) => handleChange(index, e)}
                    label="Particulars"
                    error={!!errors[index]?.particulars}
                    helperText={errors[index]?.particulars || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    id={`quantity-${index}`}
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleChange(index, e)}
                    label="Quantity"
                    error={!!errors[index]?.quantity}
                    helperText={errors[index]?.quantity || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    id={`price-${index}`}
                    name="price"
                    value={row.price}
                    onChange={(e) => handleChange(index, e)}
                    label="Price"
                    error={!!errors[index]?.price}
                    helperText={errors[index]?.price || ""}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                  }}
                >
                  <Button
                    title="Add Row"
                    variant="outlined"
                    onClick={handleAddRow}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    title="Delete Row"
                    variant="outlined"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Typography style={{ paddingTop: "1%" }} variant="h6" gutterBottom>
              Party Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.name}
                  helperText={errors[0]?.name || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="addressLine1"
                  name="addressLine1"
                  label="Address Line 1"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.addressLine1}
                  helperText={errors[0]?.addressLine1 || ""}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.city}
                  helperText={errors[0]?.city || ""}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.state}
                  helperText={errors[0]?.state || ""}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.pincode}
                  helperText={errors[0]?.pincode || ""}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="gstin"
                  name="gstin"
                  label="GSTIN"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.gstin}
                  helperText={errors[0]?.gstin || ""}
                />
              </Grid>
            </Grid>
            <Typography style={{ paddingTop: "1%" }} variant="h6" gutterBottom>
              Tax Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="cgst"
                  name="cgst"
                  label="CGST"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.cgst}
                  helperText={errors[0]?.cgst || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="sgst"
                  name="sgst"
                  label="SGST"
                  fullWidth
                  onChange={(e) => handleChange(0, e)}
                  error={!!errors[0]?.sgst}
                  helperText={errors[0]?.sgst || ""}
                />
              </Grid>
            </Grid>

            <Grid
              sx={{
                paddingTop: "1%",
                display: "flex",
                justifyContent: "center",
              }}
              item
              xs={12}
            >
              <div className="item-form-submit">
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </div>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import useFetchEmployees from "../list/useFetchEmployees";
import axiosClient from "../../axiosClient";
import dayjs from "dayjs";

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!values.employeeName) newErrors.employeeName = "Employee Name required";
    if (!values.month) newErrors.month = "Month required";
    if (!values.year) newErrors.year = "Year required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate, setErrors, setValues };
};

function AttendanceReport() {
  const { datas, loading, error, setDatas } = useFetchEmployees();
  const [reportData, setReportData] = useState([]);

  const arrEmployeeData = datas.map((EmployeeData) => ({
    value: EmployeeData[0],
    label: EmployeeData[1],
  }));

  const arrMonthData = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const arrYearData = [
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
  ];

  const initialFormState = {
    employeeName: null,
    month: null,
    year: null,
  };

  const { values, errors, handleChange, validate, setErrors, setValues } =
    useFormValidation(initialFormState);

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validate()) {
        const submissionValues = {
          employeeName: values.employeeName?.value || null,
          month: values.month?.value || null,
          year: values.year?.value || null,
        };
        setReportData([]);
  
        try {
          const { data } = await axiosClient.post(
            `/attendance-report-monthly`,
            submissionValues
          );
  
          const daysInMonth = dayjs(`${submissionValues.year}-${submissionValues.month}`).daysInMonth();
          const fullDates = Array.from({ length: daysInMonth }, (_, i) => {
            const day = dayjs(`${submissionValues.year}-${submissionValues.month}-${i + 1}`).format("YYYY-MM-DD");
            const isSunday = dayjs(day).day() === 0;
            return {
              date: day,
              emp_id: submissionValues.employeeName,
              name: values.employeeName.label,
              inTime: isSunday ? 'Weekend' : '',
              outTime: isSunday ? 'Weekend' : '',
              total_working_time: isSunday ? 'Weekend' : '',
            };
          });
  
          const completeData = fullDates.map((dateObj) => {
            const match = data.MonthlyAttendance.find(att => att.date === dateObj.date);
            return match ? match : dateObj;
          });
  
          setReportData(completeData);
        } catch (err) {
          console.log(err);
          if (err.response) {
            const response = err.response;
            if (response.status === 422) {
              setErrors(response.data.errors);
            }
          }
          console.log("Error config:", err.config);
        }
      }
    };

  const columns = [
    "S.No",
    "Date",
    "Employee Id",
    "Name",
    "In Time",
    "Out Time",
    "Working Hours",
  ];

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    tableBodyHeight: "400px",
    fixedHeader: true,
  };

  const formattedData = reportData.map((attendance, index) => [
    index + 1,
    attendance.date,
    attendance.emp_id,
    attendance.name,
    attendance.inTime,
    attendance.outTime,
    attendance.total_working_time,
  ]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 1, width: "100%" },
        "& .MuiFormControl-root": { mt: 1, width: "100%" },
        m: 3,
        background: "white",
        p: 2,
        borderRadius: 3,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" color={"#7a7467"} gutterBottom>
        Monthly Attendance
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }}></Divider>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-employee"
            options={arrEmployeeData}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            value={values.employeeName}
            onChange={handleChange("employeeName")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee Name"
                error={!!errors.employeeName}
                helperText={errors.employeeName}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-month"
            options={arrMonthData}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            value={values.month}
            onChange={handleChange("month")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Month"
                error={!!errors.month}
                helperText={errors.month}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-year"
            options={arrYearData}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value?.value
            }
            value={values.year}
            onChange={handleChange("year")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Year"
                error={!!errors.year}
                helperText={errors.year}
              />
            )}
          />
        </Grid>

        <Grid
          sx={{ display: "flex", justifyContent: "flex-end" }}
          item
          xs={12}
          sm={12}
        >
          <Button
            sx={{ alignSelf: "flex-end" }}
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      {reportData.length > 0 && (
        <MUIDataTable
          title={"Monthly Attendance"}
          data={formattedData}
          columns={columns}
          options={options}
        />
      )}
    </Box>
  );
}

export default AttendanceReport;

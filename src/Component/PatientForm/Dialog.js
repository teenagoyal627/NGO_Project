import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { useHistory } from "react-router-dom";

function DialogBox({ formData, setFormData, documents, id, imageUrl }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/patientdata");
  };

  const validateForm = () => {
    if (!formData.RegistrationNo) {
      alert("Registration Number is required");
      return false;
    }
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    documents.forEach((file, index) => {
      data.append(`documents_${index}`, file);
    });
    if (imageUrl) {
      data.append("ImageUrl", imageUrl);
    }

    const axiosMethod = id ? axios.put : axios.post;
    const axiosUrl = id
      ? `http://localhost:5000/data/${id}`
      : "http://localhost:5000/insert";
    axiosMethod(axiosUrl, data)
      .then((response) => {
        console.log("Patient data saved:", response.data);
        setFormData({
          RegistrationNo: "",
          Name: "",
          FatherName: "",
          Gender: "",
          Address: "",
          RegistrationDate: "",
          MeanOfTransportation: "",
          BroughtBy: {
            Name: "",
            Address: "",
            MobileNumber: "",
            Aadhar: "",
          },
          PatientCondition: "",
          LanguageKnown: "",
          HospitalDepartment: "",
          AandamCenter: "",
          SentToHome: "",
          OPD: "",
          InmateNumber: "",
          IONumber: "",
          IOName: "",
          AadharNumber: "",
          ImageUrl: "",
        });
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error saving patient data:", error);
      });
  };

  return (
    <>
      <button onClick={submitHandler}>Submit</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Patient Data successfully submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogBox;

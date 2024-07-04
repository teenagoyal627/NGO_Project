import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "../../Firebase";

const DialogBox = ({ formData, setFormData, documents, id, image }) => {
  console.log(documents);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    console.log("dialog box is open");
    setOpen(true);
    history.replace("/home");
  };

  const handleClose = () => {
    setOpen(false);
    history.replace("/patientdata");
  };

  const validateForm = () => {
    if (!formData.RegistrationNo) {
      alert("Registration Number is required");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    // console.log("submit button is clicked");
    e.preventDefault();
    if (!validateForm()) {
      return;
    }


    // console.log("Image uploaded on firebase");
    // const uniqueFileName = `${new Date().toISOString()}`;
    const ImgRef = doc(
      collection(database, "ImageUrlData"),
      formData.RegistrationNo
    );
    await setDoc(ImgRef, { imgUrl: image });

    // console.log("documents uploads");
    // const docRef = doc(collection(database, "PatientsDocuments"),formData.RegistrationNo);
    // await setDoc(docRef, { documents: documents },{merge:true});

    const docRef = doc(
      collection(database, "PatientsDocuments"),
      formData.RegistrationNo
    );

    try {
      await setDoc(docRef, { PatientsDocuments: documents }, { merge: true });
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }

    const axiosMethod = id ? axios.put : axios.post;
    const axiosUrl = id
      ? `http://localhost:5000/data/${id}`
      : "http://localhost:5000/insert";
    axiosMethod(axiosUrl, {
      ...formData,
      PatientsDocuments: documents,
      ImageUrl: image,
    })
      .then((response) => {
        // console.log(response);
        setFormData({
          RegistrationNo: "",
          Name: "",
          FatherName: "",
          Gender: "",
          Address: "",
          RegistrationDate: "",
          MeanOfTransportation: "",
          BroughtBy: "",
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
        handleClickOpen();

      })
      .catch((error) => {
        console.error("Error saving patient data:", error);
      });
  };
  return (
    <React.Fragment>
      <button onClick={submitHandler}> submit</button>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black" }}
            >
              Patient Data successfully submitted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default DialogBox;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import DialogBox from "./ DialogBox";
import HomeNavBar from "../Navbar/HomeNavBar";
import { storage } from "../../Firebase1";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Form = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/data/${id}`)
        .then((response) => {
          setFormData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const ImageObject = e.target.files[0];
    const ImageName = `${ImageObject.name}`;
    if (ImageObject) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(ImageObject);
    }
    const imgs = ref(storage, `PatientsImages/${ImageName}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((url) => {
        console.log("Image Url  ", url);
        setImage(url);
      });
    });
  };


  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map((file) => {
      const uniqueFileName = `${file.name}`; // Unique file name generation
      const folderPath = `PatientsDocuments/${formData.RegistrationNo}/`; // Folder structure
      const uploadedDocument = ref(storage, folderPath + uniqueFileName);
      return uploadBytes(uploadedDocument, file).then((data) => getDownloadURL(data.ref));
    });
  
    Promise.all(uploadPromises)
      .then((urls) => {
        console.log("All documents uploaded and URLs received:", urls);
        setDocuments(urls); // Set URLs in state or wherever needed
      })
      .catch((error) => {
        console.error("Error uploading documents:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("BroughtBy.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        BroughtBy: {
          ...prevState.BroughtBy,
          [field]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <HomeNavBar />

      <div className="form-container">
        <div className="top-section">
          <div className="ngo-content">
            <h2>NGO Information</h2>
            <p>This section contains information related to the NGO...</p>
          </div>
          <div className="image-upload-section">
            <div className="image-upload-box">
              <input
                type="file"
                accept="image/*"
                name="ImageUrl"
                onChange={handleImageChange}
              />
              {!image && (
                <div className="upload-placeholder">
                  Upload the image of patient
                </div>
              )}
              {image && (
                <img
                  src={image}
                  alt="Patient Preview"
                  className="image-preview"
                  style={{ width: "200px", height: "200px" }}
                />
              )}
            </div>
          </div>
        </div>
        <br />
        <form>
          <label>Registration No.</label>
          <input
            type="number"
            placeholder="Enter registration no."
            required
            name="RegistrationNo"
            value={formData.RegistrationNo}
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter patient name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
          <label>Father's Name</label>
          <input
            type="text"
            placeholder="Enter father name"
            name="FatherName"
            value={formData.FatherName}
            onChange={handleChange}
          />
          <label>Gender</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter the address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
          <label>Registration Date</label>
          <input
            type="date"
            placeholder="Enter the registration date"
            name="RegistrationDate"
            value={formData.RegistrationDate}
            onChange={handleChange}
          />
          <label>Mean of Transportation</label>
          <input
            type="text"
            placeholder="Enter mean of transport"
            name="MeanOfTransportation"
            value={formData.MeanOfTransportation}
            onChange={handleChange}
          />

          <fieldset className="form-group">
            <label>Brought By</label>
            <div className="brought-by-container">
              <input
                style={{
                  display: "flex",
                  width: "48%",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
                type="text"
                name="BroughtBy.Name"
                placeholder="Enter name of person"
                value={formData.BroughtBy.Name}
                onChange={handleChange}
              />
              <input
                style={{
                  display: "flex",
                  width: "48%",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
                type="text"
                name="BroughtBy.Address"
                placeholder="Enter address of person"
                value={formData.BroughtBy.Address}
                onChange={handleChange}
              />
              <input
                style={{
                  display: "flex",
                  width: "48%",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
                type="text"
                name="BroughtBy.MobileNumber"
                placeholder="Enter mobile number of person"
                value={formData.BroughtBy.MobileNumber}
                onChange={handleChange}
              />
              <input
                style={{
                  display: "flex",
                  width: "48%",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
                type="text"
                name="BroughtBy.Aadhar"
                placeholder="Enter Aadhar of person"
                value={formData.BroughtBy.Aadhar}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <label>Patient Condition</label>
          <input
            type="text"
            placeholder="Enter condition of patient"
            name="PatientCondition"
            value={formData.PatientCondition}
            onChange={handleChange}
          />
          <label>Language known</label>
          <input
            type="text"
            placeholder="Enter the known language of patient"
            name="LanguageKnown"
            value={formData.LanguageKnown}
            onChange={handleChange}
          />
          <label>Hospital & Department</label>
          <select
            name="HospitalDepartment"
            value={formData.HospitalDepartment}
            onChange={handleChange}
          >
            <option value="">Hospital & Department</option>
            <option value="Safdarjung Hospital">Safdarjung Hospital</option>
            <option value="AIIMS">AIIMS</option>
            <option value="JPNATC">JPNATC</option>
            <option value="RML">RML</option>
            <option value="Rajiv Gandhi Govt.Hospital, Alwar">
              Rajiv Gandhi Govt.Hospital, Alwar
            </option>
            <option value="Road side">Road side</option>
          </select>
          <label>Aandam Center</label>
          <select
            name="AandamCenter"
            value={formData.AandamCenter}
            onChange={handleChange}
          >
            <option value="">Select Aandam Center</option>
            <option value="Noida">Noida</option>
            <option value="Kaduki">Kaduki</option>
            <option value="Vijay Mandir">Vijay Mandir</option>
            <option value="Dadikar">Dadikar</option>
          </select>
          <label>Sent to Home</label>
          <input
            type="date"
            placeholder="Enter sent to home date"
            name="SentToHome"
            value={formData.SentToHome}
            onChange={handleChange}
          />
          <label>OPD</label>
          <input
            type="text"
            placeholder="Enter opd"
            name="OPD"
            value={formData.OPD}
            onChange={handleChange}
          />
          <label>Inmate Number</label>
          <input
            type="number"
            placeholder="Enter room number"
            name="InmateNumber"
            value={formData.InmateNumber}
            onChange={handleChange}
          />
          <label>IO Number</label>
          <input
            type="number"
            placeholder="Enter IO number"
            name="IONumber"
            value={formData.IONumber}
            onChange={handleChange}
          />
          <label>IO Name</label>
          <input
            type="text"
            placeholder="Enter IO name"
            name="IOName"
            value={formData.IOName}
            onChange={handleChange}
          />
          <label>Aadhar number</label>
          <input
            type="text"
            placeholder="If aadhar available then upload the aadhar number"
            name="AadharNumber"
            value={formData.AadharNumber}
            onChange={handleChange}
          />
          <label>Upload Documents</label>
          <input
            type="file"
            multiple
            accept="application/pdf,image/*"
            onChange={handleDocumentChange}
          />
          <DialogBox
            formData={formData}
            documents={documents}
            setFormData={setFormData}
            id={id}
            image={image}
          />
        </form>
      </div>
    </>
  );
};

export default Form;

// const handleSubmit = (e) => {
//   console.log("id is present",id)
//   e.preventDefault();
//   const combinedBroughtBy = `${formData.BroughtBy.Name}, ${formData.BroughtBy.Address}, ${formData.BroughtBy.MobileNumber}, ${formData.BroughtBy.Aadhar}`;
// // Create a new formData object with the combined Brought By field
//   const formDataToSend = {
//     ...formData,
//     BroughtBy: combinedBroughtBy
//   };
//   if (id) {
//     axios.put(`http://localhost:5000/data/${id}`, formDataToSend)
//       .then(response => {
//         alert('Patient data updated:', response.data);
//         history.push('/patientdata');
//       })
//       .catch(error => {
//         console.error('Error updating patient data:', error);
//       });
//   } else {
//     axios.post('http://localhost:5000/data', formDataToSend)
//       .then(response => {
//         console.log('Patient data saved:', response.data);
//         history.push('/patientdata');
//       })
//       .catch(error => {
//         console.error('Error saving patient data:', error);
//       });
//   }
// };

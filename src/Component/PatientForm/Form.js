import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import DialogBox from "./ DialogBox";
import HomeNavBar from "../Navbar/HomeNavBar";
import { storage,database } from "../../Firebase";
import { v4 } from "uuid";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import StoreImageTextFirebase from "./image";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Form = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
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
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  }, [id]);
  

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImageUrl(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       setImageUrl(e.target.files[0]);
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) =>{
    console.log(e.target.files[0])
    const file = e.target.files[0];
    setImageUrl(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(e.target.files[0]);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    const imgs = ref(storage,`PatientsImages/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log(data,"imgs")
        getDownloadURL(data.ref).then(val=>{
            setImage(val)
        })
    })
}

  // const uploadImage = () => {
  //   if (!ImageUrl) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   const imags = ref(storage, `Patients/${v4()}`);
  //   uploadBytes(imags, ImageUrl).then((data) => {
  //     console.log(data, "imags");
  //     getDownloadURL(data.ref).then(val=>{
  //       setImage(val)
  //   });
  // })
  // };

  const uploadImage = async () =>{
    console.log("Upload button is clicked")
        const valRef = collection(database,'ImageUrlData')
        await addDoc(valRef,{imgUrl:image})
        alert("Image Uploaded successfully")
}

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
    files.map((file) => file.name);
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
              {!imagePreview && (
                <div className="upload-placeholder">
                  Upload the image of patient
                </div>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Patient Preview"
                  className="image-preview"
                />
              )}
              <button type="file" onClick={(e) => uploadImage(e)}>
                Upload
              </button>
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
            ImageUrl={ImageUrl}
            image={image}
            setImage={setImage}
          />
        </form>
      </div>
      <StoreImageTextFirebase/>
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

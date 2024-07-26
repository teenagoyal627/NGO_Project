
import { collection, doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { database } from "../../../Firebase";

export  const validateForm = (formData) => {
    if (!formData.RegistrationNo) {
      return false;
    }
    return true;
  };


export  const dialogBoxSubmitHandler = async (e,setModalContent,setShowModal,formData,documents,image,setFormData,id) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      setModalContent({
        title: "Error",
        body: "Registration Number is required"
      });
      setShowModal(true);
      return;
    }
    setModalContent({
      title: "Processing",
      body: "It's take few seconds to submit the patients data on database."
    });
    setShowModal(true);

    const ImgRef = doc(
      collection(database, "ImageUrlData"),
      formData.RegistrationNo
    );
    await setDoc(ImgRef, { imgUrl: image });

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
      .then(() => {
       
        setModalContent({
          title: "Success",
          body: "Patient Data successfully submitted."
        });
        setShowModal(true);
      })
      .catch((error) => {
        setModalContent({
          title: "Error",
          body: `Error saving patient data: ${error.message}`
        });
        setShowModal(true);
      });
  };


  export const dialogBoxConfirm = (
    setShowModal,
    modalContent,
    history,
    setFormData
  ) => {
    setShowModal(false);
    if (modalContent.title === "Success") {
      history.replace("/patientdata");
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
    } 
    else {
      history.replace("/form");
    }
  };
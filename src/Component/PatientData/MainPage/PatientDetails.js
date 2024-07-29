import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./PatientData.css";
import OtherPageNavbar from "../../Navbar/OtherPageNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../Firebase";
import {
  closeModal,
  deleteHandler,
  editHandler,
  printHandler,
} from "../Utilities/PatientDataUtilities";
import TableFormate from "../TablePatientData/TableFormate";
import PrintModal from "../TablePatientData/PrintModal";
import FilterData from "../Filter/Filter";
import { getAuth } from "firebase/auth";

const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [docData, setDocData] = useState([]);

  const history = useHistory();

  // useEffect(() => {
  //   const auth = getAuth();
  //   const userId = auth.currentUser.uid;

  //   if (userId) {
  //     axios
  //       .get(`http://localhost:5000/data`, {
  //         params: { userId },
  //       })

  //       .then((response) => {
  //         setPatients(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }

  //   const getImageData = async (RegistrationNo) => {
  //     console.log(RegistrationNo)
  //     const ImgRef = collection(database, "ImageUrlData");
  //     const ImgDb = await getDocs(ImgRef);
  //     const allImgData = ImgDb.docs.map((img) => {
  //       // console.log( 'img.id', img.id,'type of',typeof img.id)
  //       return {
  //         ...img.data(),
  //         id: img.id,
  //       };
  //     });
  //     setImgData(allImgData);
  //     // console.log(allImgData);
  //     const patientImage = allImgData.find(
  //       (img) => Number(img.id) === RegistrationNo
  //     );
  //     return patientImage ? patientImage.url : "no image";
  //   };

  //   const getDocumentData = async () => {
  //     const docRef = collection(database, "PatientsDocuments");
  //     const docDb = await getDocs(docRef);
  //     const allDocData = docDb.docs.map((doc) => {
  //       return {
  //         ...doc.data(),
  //         id: doc.id,
  //       };
  //     });
  //     // console.log(allDocData);
  //     setDocData(allDocData);
  //   };
  //   getImageData();
  //   getDocumentData();
  // }, []);


  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
  
    const fetchPatientData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data", {
          params: { userId },
        });
        const patients = response.data;
        console.log(patients)
  
        // Fetch image and document data for each patient
        for (const patient of patients) {
          const RegistrationNo = patient.RegistrationNo;
          console.log(RegistrationNo)
  
          const imageUrl = await getImageData(RegistrationNo);
          console.log(imageUrl)
          const documents = await getDocumentData(RegistrationNo);
          console.log(documents)
  
          // Update the patient data with image and document URLs
          patient.imageUrl = imageUrl;
          patient.documents = documents;
        }
  
        setPatients(patients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const getImageData = async (RegistrationNo) => {
      const ImgRef = collection(database, "ImageUrlData");
      const ImgDb = await getDocs(ImgRef);
      const allImgData = ImgDb.docs.map((img) => ({
        ...img.data(),
        id: img.id,
      }));
  
      const patientImage = allImgData.find(
        (img) => Number(img.id) === RegistrationNo
      );
      console.log(patientImage)
      return patientImage ? patientImage.imgUrl : "no image";
    };
  
    const getDocumentData = async (RegistrationNo) => {
      const docRef = collection(database, "PatientsDocuments");
      const docDb = await getDocs(docRef);
      const allDocData = docDb.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      const patientDocuments = allDocData.find(
        (doc) => Number(doc.id) === RegistrationNo,

      );
      console.log(patientDocuments)

      return patientDocuments ? patientDocuments.PatientsDocuments : [];
    };
  
    if (userId) {
      fetchPatientData();
    }
  }, []);


  return (
    <>
      <OtherPageNavbar />
      <FilterData patients={patients} setPatients={setPatients} />
      <TableFormate
        patients={patients}
        imgData={imgData}
        docData={docData}
        editHandler={(id) => editHandler(id, history)}
        printHandler={(patient) =>
          printHandler(patient, setSelectedPatient, setShowModal)
        }
        deleteHandler={(id) => deleteHandler(id, setPatients)}
      />
      <PrintModal
        selectedPatient={selectedPatient}
        closeModal={() => closeModal(setShowModal, setSelectedPatient)}
        showModal={showModal}
      />
    </>
  );
};

export default AllPatientDetails;

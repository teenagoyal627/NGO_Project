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
import FilterData from "../Filter/MainFilter";

const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [docData, setDocData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const getImageData = async (RegistrationNo) => {
      const ImgRef = collection(database, "ImageUrlData");
      const ImgDb = await getDocs(ImgRef);
      const allImgData = ImgDb.docs.map((img) => {
        // console.log( 'img.id', img.id,'type of',typeof img.id)
        return {
          ...img.data(),
          id: img.id,
        };
      });
      setImgData(allImgData);
      // console.log(allImgData);
      const patientImage = allImgData.find(
        (img) => Number(img.id) === RegistrationNo
      );
      return patientImage ? patientImage.url : "no image";
    };

    const getDocumentData = async () => {
      const docRef = collection(database, "PatientsDocuments");
      const docDb = await getDocs(docRef);
      const allDocData = docDb.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      // console.log(allDocData);
      setDocData(allDocData);
    };
    getImageData();
    getDocumentData();
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

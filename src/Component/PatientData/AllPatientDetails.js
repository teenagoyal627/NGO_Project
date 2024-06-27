import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import './AllPatientData.css';
import HomeNavBar from '../Navbar/HomeNavBar';
import SapnaLogo from '../Navbar/Logo/SapnaLogo.png';
import Report from './Report';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from '../../Firebase';

const AllPatientDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])

  const history = useHistory();


  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const getData = async () =>{
    const valRef = collection(database,'ImageUrlData')
    const dataDb = await getDocs(valRef)
    const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
    setData(allData)
    console.log(dataDb)
}

useEffect(()=>{
    getData()
},[]) 
  const editHandler = (id) => {
    console.log("Edit button clicked");
    console.log(id);
    history.push(`/home/${id}`);
  };

  const deleteHandler = async (id) => {
    console.log("Delete button clicked");
    const response = await axios.delete(`http://localhost:5000/data/${id}`);
    console.log(response);
    setPatients(prevPatients => prevPatients.filter(patient => patient._id !== id));
  };

  const printHandler = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <>
      <HomeNavBar />
      <Report patients={patients} setPatients={setPatients}/>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
            <th>Sr No.</th>
              <th>RegistrationNo</th>
              <th>Name</th>
              <th>FatherName</th>
              <th>Gender</th>
              <th>Address</th>
              <th>RegistrationDate</th>
              <th>MeanOfTransportation</th>
              <th>BroughtBy</th>
              <th>PatientCondition</th>
              <th>LanguageKnown</th>
              <th>HospitalDepartment</th>
              <th>AandamCenter</th>
              <th>SentToHome</th>
              <th>OPD</th>
              <th>InmateNumber</th>
              <th>IONumber</th>
              <th>IOName</th>
              <th>AadharNumber</th>
              <th>Image</th>
              <th>Uploaded Documents</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
              <td>{index+1}</td>
                <td>{patient.RegistrationNo}</td>
                <td>{patient.Name}</td>
                <td>{patient.FatherName}</td>
                <td>{patient.Gender}</td>
                <td>{patient.Address}</td>
                <td>{patient.RegistrationDate}</td>
                <td>{patient.MeanOfTransportation}</td>
                <td>
                  {`${patient.BroughtBy?.Name || '...'}, ${patient.BroughtBy?.Address || '...'}, ${patient.BroughtBy?.MobileNumber || '...'}, ${patient.BroughtBy?.Aadhar || '...'}`}
                </td>
                <td>{patient.PatientCondition}</td>
                <td>{patient.LanguageKnown}</td>
                <td>{patient.HospitalDepartment}</td>
                <td>{patient.AandamCenter}</td>
                <td>{patient.SentToHome}</td>
                <td>{patient.OPD}</td>
                <td>{patient.InmateNumber}</td>
                <td>{patient.IONumber}</td>
                <td>{patient.IOName}</td>
                <td>{patient.AadharNumber}</td>
                <td>{
                data.map(value=><div>
                    <img src={value.imgUrl} height='200px' width='200px' /> 
                </div>)
             }</td>
                <td>{patient.UploadedDocuments}</td>
            
                <td onClick={() => editHandler(patient._id)}><FaEdit className="icon" /></td>
                <td onClick={() => deleteHandler(patient._id)}><MdDelete className="icon" /></td>
                <td onClick={() => printHandler(patient)}><FaPrint className="icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedPatient && (
        <div className="modal fade show" style={{ display: "block", margin: "0", padding: "0", boxSizing: "border-box" }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content print-modal-content" style={{ position: "absolute", left: "0", top: "0", width: "110mm", minHeight: "297mm", boxSizing: "border-box", background: "white" }}>
              <div className="modal-header">
                <img src={SapnaLogo} alt='logo of ngo' className='logo-image1' />
                <h1 className="modal-title fs-5" id="exampleModalLabel">Aandam-Home for the homeless ({selectedPatient.AandamCenter})</h1>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body print-body">
                <table className="print-table">
                  <tbody>
                    <tr>
                      <td>Registration No:</td>
                      <td>{selectedPatient.RegistrationNo}</td>
                    </tr>
                    <tr>
                      <td>Name:</td>
                      <td>{selectedPatient.Name}</td>
                    </tr>
                    <tr>
                      <td>Father's Name:</td>
                      <td>{selectedPatient.FatherName}</td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>{selectedPatient.Gender}</td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>{selectedPatient.Address}</td>
                    </tr>
                    <tr>
                      <td>Registration Date:</td>
                      <td>{selectedPatient.RegistrationDate}</td>
                    </tr>
                    <tr>
                      <td>Mean of Transportation:</td>
                      <td>{selectedPatient.MeanOfTransportation}</td>
                    </tr>
                    <tr>
                      <td>Brought By:</td>
                      <td>{`${selectedPatient.BroughtBy?.Name || '...'}, ${selectedPatient.BroughtBy?.Address || '...'}, ${selectedPatient.BroughtBy?.MobileNumber || '...'}, ${selectedPatient.BroughtBy?.Aadhar || '...'}`}</td>
                    </tr>
                    <tr>
                      <td>Patient Condition:</td>
                      <td>{selectedPatient.PatientCondition}</td>
                    </tr>
                    <tr>
                      <td>Language Known:</td>
                      <td>{selectedPatient.LanguageKnown}</td>
                    </tr>
                    <tr>
                      <td>Hospital Department:</td>
                      <td>{selectedPatient.HospitalDepartment}</td>
                    </tr>
                    <tr>
                      <td>Aandam Center:</td>
                      <td>{selectedPatient.AandamCenter}</td>
                    </tr>
                    <tr>
                      <td>Sent to Home:</td>
                      <td>{selectedPatient.SentToHome}</td>
                    </tr>
                    <tr>
                      <td>OPD:</td>
                      <td>{selectedPatient.OPD}</td>
                    </tr>
                    <tr>
                      <td>Inmate Number:</td>
                      <td>{selectedPatient.InmateNumber}</td>
                    </tr>
                    <tr>
                      <td>IO Number:</td>
                      <td>{selectedPatient.IONumber}</td>
                    </tr>
                    <tr>
                      <td>IO Name:</td>
                      <td>{selectedPatient.IOName}</td>
                    </tr>
                    <tr>
                      <td>Aadhar Number:</td>
                      <td>{selectedPatient.AadharNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => window.print()}>Print</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllPatientDetails;



import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";

const TableFormate = ({
  patients,
  imgData,
  docData,
  editHandler,
  printHandler,
  deleteHandler,
}) => {
  return (
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
          {patients.map((patient, index) => {
            const patientImage = imgData.find(
              (img) => Number(img.id) === patient.RegistrationNo
            );
            const patientDocuments = docData.find(
              (doc) => Number(doc.id) === patient.RegistrationNo
            );

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{patient.RegistrationNo}</td>
                <td>{patient.Name}</td>
                <td>{patient.FatherName}</td>
                <td>{patient.Gender}</td>
                <td>{patient.Address}</td>
                <td>{patient.RegistrationDate}</td>
                <td>{patient.MeanOfTransportation}</td>
                <td>
                  {`${patient.BroughtBy?.Name || "..."}, ${
                    patient.BroughtBy?.Address || "..."
                  }, ${patient.BroughtBy?.MobileNumber || "..."}, ${
                    patient.BroughtBy?.Aadhar || "..."
                  }`}
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
                <td>
                  {patientImage && (
                    <img
                      src={patientImage.imgUrl}
                      height="200px"
                      width="200px"
                      alt="Patient"
                    />
                  )}
                </td>
                <td>
                  {patientDocuments?.PatientsDocuments.map((docUrl, index) => (
                    <div key={index}>
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Document {index + 1}
                      </a>
                    </div>
                  ))}
                </td>
                <td onClick={() => editHandler(patient._id)}>
                  {console.log(typeof patient._id)}
                  <FaEdit className="icon" />
                </td>
                <td onClick={() => deleteHandler(patient._id)}>
                  <MdDelete className="icon" />
                </td>
                <td onClick={() => printHandler(patient)}>
                  <FaPrint className="icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableFormate;

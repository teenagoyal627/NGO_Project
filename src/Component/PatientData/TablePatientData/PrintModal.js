import React from 'react'
import SapnaLogo from '../../Navbar/Logo/SapnaLogo.png'


const PrintModal = ({selectedPatient,closeModal,showModal}) => {
  if(!showModal||!selectedPatient){
    return null;
  }
    return (
    <div
    className="modal fade show"
    style={{
        display: "block",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
    }}
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div className="modal-dialog">
        <div
            className="modal-content print-modal-content"
            style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "210mm",
                minHeight: "297mm",
                boxSizing: "border-box",
                background: "white",
            }}
        >
            <div className="modal-header">
                <img
                    src={SapnaLogo}
                    alt="logo of ngo"
                    className="logo-image1"
                />
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Aandam-Home for the homeless ({selectedPatient.AandamCenter ? selectedPatient.AandamCenter : "No "})
                </h1>
                <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body print-body">
                <table className="print-table">
                    <tbody>
                    <tr>
                      <td>Patient Image</td>
                      <td>
                  {selectedPatient.imageUrl ? (
                    <img
                      src={selectedPatient.imageUrl}
                      alt="Patient"
                      style={{ width: '100px', height: '100px' }}
                    />
                  ) : (
                    'No Image Available'
                  )}
                </td>  
                 </tr>
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
                      <td>{`${selectedPatient.BroughtBy?.Name || "..."}, ${selectedPatient.BroughtBy?.Address || "..."}, ${selectedPatient.BroughtBy?.MobileNumber || "..."}, ${selectedPatient.BroughtBy?.Aadhar || "..."}`}</td>
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
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => window.print()}
                >
                    Print
                </button>
            </div>
        </div>
    </div>
</div>
  )
}

export default PrintModal

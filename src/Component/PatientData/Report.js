import React from "react";
import "./Report.css";
import { useState } from "react";

const Report = ({ patients, setPatients }) => {
  const [click, setClicked] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gender: {
      Male: false,
      Female: false,
    },
  });

  const clickHandler = () => {
    setClicked(true);
  };

  const handleDateChange = (e) => {
    console.log("date is change");
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    console.log("gender change");
    setFilters({
      ...filters,
      gender: {
        ...filters.gender,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const filterHandler = (e) => {
    e.preventDefault()
    console.log("filter button is clicked ");
    const filteredData = patients.filter((item) => {
    const itemDate = new Date(item.RegistrationDate);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    if (startDate && itemDate < startDate) 
        return false;
    if (endDate && itemDate > endDate) 
        return false;
    if (filters.gender.Male && item.Gender !== "Male") 
        return false;
    if (filters.gender.Female && item.Gender !== "Female") 
        return false;
    return true; 
    });
     if (filteredData.length === 0) {
        alert("No Patients Details");
    } else {
        setPatients(filteredData);
        alert("Data is filtered");
    }
  };

  const handleClose = () => {
    setFilters({
      startDate: "",
      endDate: "",
      gender: {
        Male: false,
        Female: false,
      },
    });
  };
  return (
    <div>
      <div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={clickHandler}
          type="button"
          className="filter_button"
        >
          Apply Filter
        </button>
      </div>
      {click && (
        <>
          <div
            class="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Choose Filter
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="filter-section">
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="filter-section">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="filter-section">
                    <label>Gender</label>
                    <div className="gender-checkbox">
                      <input
                        type="checkbox"
                        name="Male"
                        checked={filters.gender.Male}
                        onChange={handleGenderChange}
                      />
                      <label>Male</label>
                      <input
                        type="checkbox"
                        name="Female"
                        checked={filters.gender.Female}
                        onChange={handleGenderChange}
                      />
                      <label>Female</label>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={handleClose}
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={filterHandler}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;





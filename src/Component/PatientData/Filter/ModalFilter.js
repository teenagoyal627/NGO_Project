import React from "react";
import './Filter.css'

const ModalFilter = ({
  modalRef,
  handleClose,
  filters,
  handleDateChange,
  handleGenderChange,
  filterHandler,
}) => {
  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Choose Filter
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={filterHandler}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;

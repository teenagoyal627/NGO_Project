import React, { useState, useRef } from "react";
import ModalFilter from "./ModalFilter";
import { MessageBox } from "../../MessageBox";
import {
  handleDateChange,
  handleGenderChange,
  filterHandler,
} from "./Utilities/FilterUtilities";

const FilterData = ({ setPatients }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gender: {
      Male: false,
      Female: false,
    },
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const modalRef = useRef(null);

  return (
    <div>
      <button
        type="button"
        className="filter_button"
        onClick={() => setShowFilterModal(true)}
      >
        Apply Filter
      </button>
      {showFilterModal && (
        <ModalFilter
          modalRef={modalRef}
          handleClose={() => setShowFilterModal(false)}
          filters={filters}
          handleDateChange={(e) => handleDateChange(e, setFilters, filters)}
          handleGenderChange={(e) => handleGenderChange(e, setFilters, filters)}
          filterHandler={(e) =>
            filterHandler(
              e,
              filters,
              setPatients,
              setModalContent,
              setShowModal,
              setShowFilterModal
            )
          }
        />
      )}
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => setShowModal(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default FilterData;

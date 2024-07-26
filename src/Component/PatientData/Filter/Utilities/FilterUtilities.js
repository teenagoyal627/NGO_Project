import axios from "axios";


export const handleDateChange = (e,setFilters,filters) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
export  const handleGenderChange = (e,setFilters,filters) => {
    setFilters({
      ...filters,
      gender: {
        ...filters.gender,
        [e.target.name]: e.target.checked,
      },
    });
  };

export const filterHandler = async (e,filters,setPatients,setModalContent,setShowModal,setShowFilterModal) => {
  e.preventDefault();
  const gender = JSON.stringify(filters.gender);
  try {
    const response = await axios.post("http://localhost:5000/filter", {
      startDate: filters.startDate,
      endDate: filters.endDate,
      gender,
    });
    setPatients(response.data);

    const filteredData = response.data;
    if (filteredData.length > 0) {
      setModalContent({
        title: "Success",
        body: "Patients are successfully filtered."
      });
      setShowModal(true);
      setShowFilterModal(false); 
    } else {
      setModalContent({
        title: "Not Found",
        body: "No patients found.",
      });
      setShowModal(true);
      setShowFilterModal(false); 
    }

  } catch (error) {
    setModalContent({
      title: "Error",
      body: "There was an error filtering the data.",
    });
    setShowModal(true);
    setShowFilterModal(false); // Hide the filter modal on error
    console.error("Error filtering data:", error);
  }
};
  export const handleClose = (setFilters) => {
    setFilters({
      startDate: "",
      endDate: "",
      gender: {
        Male: false,
        Female: false,
      },
    })}
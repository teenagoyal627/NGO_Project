  
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../Firebase";
import axios from "axios";

export  const getImageForPrint = async (RegistrationNo) => {
    const ImgRef = collection(database, "ImageUrlData");
    const ImgDb = await getDocs(ImgRef);
    const allImgData = ImgDb.docs.map((img) => ({
      ...img.data(),
      id: img.id,
    }));  
    const patientImage = allImgData.find((img) => Number(img.id) === RegistrationNo);
    if (patientImage) {
      return patientImage.imgUrl;
    } else {
      return "no image";
    }
  };

 export const printHandler =async (patient,setSelectedPatient,setShowModal) => {
    try{
      const imageUrl=await getImageForPrint(patient.RegistrationNo)
      console.log(imageUrl)
      setSelectedPatient({...patient,imageUrl});
      setShowModal(true);
    }catch(error){
      console.error("show error ",error)
    }
  };


  export  const deleteHandler = async (id,setPatients) => {
    console.log("Delete button clicked");
    const response = await axios.delete(`http://localhost:5000/data/${id}`);
    console.log(response);
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient._id !== id)
    );
  };


  export const closeModal = (setShowModal,setSelectedPatient) => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  export 
  const editHandler = (id,history) => {
    console.log("Edit button clicked")
    console.log(id);
    history.push(`/form/${id}`)
  };
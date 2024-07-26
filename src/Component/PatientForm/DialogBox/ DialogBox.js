import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import { dialogBoxSubmitHandler,dialogBoxConfirm } from "./Utility";
const DialogBox = ({ formData, setFormData, documents, id, image }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: ""
  });
  const history = useHistory();

  return (
    <React.Fragment>
      <button onClick={(e)=>dialogBoxSubmitHandler(e,setModalContent,setShowModal,formData,documents,image,setFormData,id)}>Submit</button>
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => dialogBoxConfirm(setShowModal,modalContent,history,setFormData)}
        title={modalContent.title}
        body={modalContent.body}
      />
    </React.Fragment>
  );
};

export default DialogBox;

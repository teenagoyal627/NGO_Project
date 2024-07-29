import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MessageBox } from "../../MessageBox";
import { dialogBoxSubmitHandler, dialogBoxConfirm } from "./UtilitiesDialogBox";
import { getAuth } from "firebase/auth";

const DialogBox = ({ formData, setFormData, documents, id, image }) => {
  console.log(documents);
  console.log(image);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const history = useHistory();
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  console.log("userId form dialog box", userId);
  return (
    <React.Fragment>
      <button
        onClick={(e) =>
          dialogBoxSubmitHandler(
            e,
            setModalContent,
            setShowModal,
            formData,
            documents,
            image,
            setFormData,
            id,
            userId
          )
        }
      >
        Submit
      </button>
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          dialogBoxConfirm(setShowModal, modalContent, history, setFormData)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </React.Fragment>
  );
};

export default DialogBox;

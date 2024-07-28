import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase";

export const handleImageChange = (e, setImage) => {
  const ImageObject = e.target.files[0];
  const ImageName = `${ImageObject.name}`;
  if (ImageObject) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(ImageObject);
  }
  const imgs = ref(storage, `PatientsImages/${ImageName}`);
  uploadBytes(imgs, e.target.files[0]).then((data) => {
    getDownloadURL(data.ref).then((url) => {
      setImage(url);
    });
  });
};

export const formChangeHandler = (e, setFormData, formData) => {
  const { name, value } = e.target;

  if (name.includes("BroughtBy.")) {
    const field = name.split(".")[1];
    setFormData((prevState) => ({
      ...prevState,
      BroughtBy: {
        ...prevState.BroughtBy,
        [field]: value,
      },
    }));
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

export const handleDocumentChange = (
  e,
  formData,
  setDocuments,
  setModalContent,
  setShowModal
) => {
  const files = Array.from(e.target.files);
  const uploadPromises = files.map((file) => {
    const uniqueFileName = `${file.name}`;
    const folderPath = `PatientsDocuments/${formData.RegistrationNo}/`; // Folder structure
    const uploadedDocument = ref(storage, folderPath + uniqueFileName);
    return uploadBytes(uploadedDocument, file).then((data) =>
      getDownloadURL(data.ref)
    );
  });

  Promise.all(uploadPromises)
    .then((urls) => {
      // console.log("All documents uploaded and URLs received:", urls);
      setDocuments(urls);
    })
    .catch((error) => {
      setModalContent({
        title: "Error",
        body: `Error uploading documents: ${error.message}`
      });
      setShowModal(true);
      console.error("Error uploading documents:", error);
    });
};

export const formConfirmHandler = (setShowModal, modalContent, history) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/form");
  } else {
    history.replace("/form");
  }
};

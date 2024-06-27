import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../Firebase';

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
  };

  const uploadImage1 = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const imags = ref(storage, `PatientsImages/${v4()}`);
    uploadBytes(imags, file).then((data) => {
      console.log(data, "imags");
    });
  };

  return (
    <div className="image-upload-box">
      <input
        type="file"
        accept="image/*"
        name="ImageUrl"
        onChange={handleImageChange}
      />

      {image && <img width={100} height={100} src={image} alt="Selected" />}
      <button type="button" onClick={uploadImage1}>Upload</button>
    </div>
  );
};

export default UploadComponent;

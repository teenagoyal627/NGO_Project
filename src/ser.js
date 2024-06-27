const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./Database/Database");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://localhost:27017/PatientData";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) =>
    console.log("Error is present when establishing the database", err)
  );

app.put("/data/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(400).json(err));
});

// this is for upload the image on mongodb
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination callback is called");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("Filename callback is called");
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/insert", upload.single("ImageUrl"), async (req, res) => {
  console.log("the req file is ", req.file);
  try {
    const ImageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "no url found";
    console.log("the image url is ", ImageUrl);
    const {
      RegistrationNo,
      Name,
      FatherName,
      Gender,
      Address,
      RegistrationDate,
      MeanOfTransportation,
      BroughtBy,
      PatientCondition,
      LanguageKnown,
      HospitalDepartment,
      AandamCenter,
      SentToHome,
      OPD,
      InmateNumber,
      IONumber,
      IOName,
      AadharNumber,
    } = req.body;

    const formData = new User({
      RegistrationNo,
      Name,
      FatherName,
      Gender,
      Address,
      RegistrationDate,
      MeanOfTransportation,
      BroughtBy,
      PatientCondition,
      LanguageKnown,
      HospitalDepartment,
      AandamCenter,
      SentToHome,
      OPD,
      InmateNumber,
      IONumber,
      IOName,
      AadharNumber,
      ImageUrl, // Save image URL to database
    });

    await formData.save();
    res.send("Inserted data with image...");
    console.log("the image", ImageUrl);
    console.log("Data is inserted with image URL");
  } catch (err) {
    console.error("Error occurred: ", err);
    res.status(500).send("Server error");
  }
});

app.get("/data", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//this is for edit the patient form
app.get("/data/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((patient) => res.json(patient))
    .catch((err) => res.status(500).json({ message: "Server error" }));
});

//this code is for delete teh data form the database
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((deletedPatient) => {
      if (!deletedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.json({ deletedPatient });
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed to delete patient" });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




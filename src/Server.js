const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./Database/Database");


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

app.post("/insert", async (req, res) => {
  try {
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
    });

    await formData.save();
    console.log(formData._id)
    console.log("Data is inserted");
    res.status(200).json({success:true,id:formData._id})
    // console.log(res)
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




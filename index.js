const express = require("express");
// import express from "express"
const multer = require("multer");
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require("fs");
const connectTomongoose = require("./dbconnection/db");
const ProjectSchema = require("./Models/Pojects/Projects");
const BlogsSchema = require("./Models/Blog/Blogs");
const ContactSchema = require("./Models/Contacts/Contacts");
const CoursesSchema = require("./Models/Courses/Courses");
const Gallery1Schema = require("./Models/Gallery/Gallery1");
const MyprofileSchema = require("./Models/Myprofile/Myprofile");
const ProjectsSchema = require("./Models/Pojects/Projects");
const SupportSchema = require("./Models/Support/Support");
const UserSchema = require("./Models/Users/User");
let { origin } = require("./dbconnection/index");
const { check, validationResult } = require("express-validator");
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("public/"));
connectTomongoose();

const validateCreateUser = [
  check("username").not().isEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// =======================================================================================================================
//-------------------------------------------------------- Project Api's--------------------------------------------------
// =======================================================================================================================

// Create a new Project
app.post("/create-projects", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);

    const image = req.file ? req.file.filename : undefined;
    const Project = new ProjectSchema(req.body);
    await Project.save();
    res.status(201).json(Project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all Projects
app.get("/get-all-projects", async (req, res) => {
  try {
    console.log("create-projects");
    const Projects = await ProjectSchema.find();
    res.json(Projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single Project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const Project = await ProjectSchema.findById(req.params.id);
    if (!Project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(Project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a Project by ID
app.put("/update-projects/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      discription,
      startDate,
      EndDate,
      status,
      completeStatus,
      assignedTo,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Project = await ProjectSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription,
        startDate,
        EndDate,
        status,
        completeStatus,
        image,
        assignedTo,
      },
      { new: true }
    );
    if (!Project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(Project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete a Project by ID
app.delete("/delete-project/:id", async (req, res) => {
  try {
    const Project = await ProjectSchema.findByIdAndDelete(req.params.id);

    if (!Project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================================================================================================================
//-------------------------------------------------------- User-----------------------------------------------------------
// =======================================================================================================================

// Create a new user
app.post("/create-user", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      country,
      city,
      phone,
      website,
      twitter,
      linkedin,
      instagram,
      gitHub,
      totalRevenue,
      orders,
      products,
      rate,
      earned,
      CompanyName,
      department,
      designation,
      hiringDate,
      status,
      facebook,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const User = new UserSchema({
      name,
      image,
      email,
      phone,
      city,
      rate,
      website,
      earned,
      country,
      totalRevenue,
      CompanyName,
      products,
      department,
      gitHub,
      orders,
      designation,
      instagram,
      hiringDate,
      status,
      facebook,
      linkedin,
      twitter,
    });

    await User.save();
    res.status(201).json(User);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all user
app.get("/get-all-user", async (req, res) => {
  try {
    const user = await UserSchema.find();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a user by ID
app.put("/update-user/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      discription,
      startDate,
      EndDate,
      status,
      completeStatus,
      assignedTo,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const user = await UserSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription,
        startDate,
        EndDate,
        status,
        completeStatus,
        image,
        assignedTo,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete a user by ID
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================================================================================================================
//-------------------------------------------------------- Contact---------------------------------------------------------
// =======================================================================================================================

// Create a new Contact
app.post("/create-Contact", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
 const      { name, email, phone,position,company } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Contact =    await  new ContactSchema({
      name,
      email,
      phone,
      position,
      company,
      image,
    });

    await Contact.save();
    res.status(201).json(Contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all Contact
app.get("/get-all-Contact", async (req, res) => {
  try {
    const Contact = await ContactSchema.find();
    res.json(Contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single Contact by ID
app.get("/Contact/:id", async (req, res) => {
  try {
    const Contact = await ContactSchema.findById(req.params.id);
    if (!Contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(Contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a Contact by ID
app.put("/update-Contact/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      discription,
      startDate,
      EndDate,
      status,
      completeStatus,
      assignedTo,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Contact = await ContactSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription,
        startDate,
        EndDate,
        status,
        completeStatus,
        image,
        assignedTo,
      },
      { new: true }
    );
    if (!Contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(Contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete a Contact by ID
app.delete("/delete-Contact/:id", async (req, res) => {
  try {
    const Contact = await ContactSchema.findByIdAndDelete(req.params.id);

    if (!Contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================================================================================================================
//-------------------------------------------------------- Courses---------------------------------------------------------
// =======================================================================================================================

// Create a new Courses
app.post("/create-Courses", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Courses = new CoursesSchema({
      name,
      description,
      price,
      image,
    });

    await Courses.save();
    res.status(201).json(User);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all Courses
app.get("/get-all-Courses", async (req, res) => {
  try {
    const Courses = await CoursesSchema.find();
    res.json(Courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single Courses by ID
app.get("/Courses/:id", async (req, res) => {
  try {
    const Courses = await CoursesSchema.findById(req.params.id);
    if (!Courses) {
      return res.status(404).json({ message: "Courses not found" });
    }
    res.json(Courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a Courses by ID
app.put("/update-Courses/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      discription,
      startDate,
      EndDate,
      status,
      completeStatus,
      assignedTo,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Courses = await CoursesSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription,
        startDate,
        EndDate,
        status,
        completeStatus,
        image,
        assignedTo,
      },
      { new: true }
    );
    if (!Courses) {
      return res.status(404).json({ message: "Courses not found" });
    }
    res.json(Courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete a Courses by ID
app.delete("/delete-Courses/:id", async (req, res) => {
  try {
    const Courses = await CoursesSchema.findByIdAndDelete(req.params.id);

    if (!Courses) {
      return res.status(404).json({ message: "Courses not found" });
    }

    res.json({ message: "Courses deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================================================================================================================
//-------------------------------------------------------- Support---------------------------------------------------------
// =======================================================================================================================

// Create a new Support
app.post("/create-Support", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const { name, Priority, Status,Subject } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Support = new SupportSchema({
      name,
      image,
      Priority,
      image,
      Status,
      Subject,
    });

    await Support.save();
    res.status(201).json(Support);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all Support
app.get("/get-all-Support", async (req, res) => {
  try {
    const Support = await SupportSchema.find();
    res.json(Support);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single Support by ID
app.get("/Support/:id", async (req, res) => {
  try {
    const Support = await SupportSchema.findById(req.params.id);
    if (!Support) {
      return res.status(404).json({ message: "Support not found" });
    }
    res.json(Support);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a Support by ID
app.put("/update-Support/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      discription,
      startDate,
      EndDate,
      status,
      completeStatus,
      assignedTo,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const Support = await SupportSchema.findByIdAndUpdate(
      req.params.id,
      {
        title,
        discription,
        startDate,
        EndDate,
        status,
        completeStatus,
        image,
        assignedTo,
      },
      { new: true }
    );
    if (!Support) {
      return res.status(404).json({ message: "Support not found" });
    }
    res.json(Support);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete a Support by ID
app.delete("/delete-Support/:id", async (req, res) => {
  try {
    const Support = await SupportSchema.findByIdAndDelete(req.params.id);

    if (!Support) {
      return res.status(404).json({ message: "Support not found" });
    }

    res.json({ message: "Support deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================================================================================================================
//-------------------------------------------------------- Support---------------------------------------------------------
// =======================================================================================================================

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});

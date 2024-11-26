const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// import Routes
app.use("/api/auth", require("./routes/auth"));

//Employee Management Function Routes
const employRoutes = require("./routes/employee");

//Project Management Function Routes
const projectsRoutes = require("./routes/projects");

//Department Management Function Routes
const departmentsRoutes = require("./routes/departments");

//Financial Management Function Routes
const financialRoutes = require("./routes/financial");


//route middleware
app.use(employRoutes);
app.use(projectsRoutes);
app.use(departmentsRoutes);
app.use(financialRoutes);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // get anything, load index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// prod false bcz  it will not run build script if its in prod, once its done it will be in prod

// login heroku , create new app

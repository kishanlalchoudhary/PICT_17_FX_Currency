const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./db/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { uploadCSV } = require("./controllers/currencyControllers");

dotenv.config();
const PORT = process.env.PORT || 8000;

// Server Creation
const app = express();

// Connecting Database
connectdb();

let whitelist = ["http://localhost:5173"];

let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

app.post("/uploadCSV", upload.single("file"), uploadCSV);

// Routes
app.use("/api/currency", require("./routes/currencyRoutes"));

// middlewares
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started successfully at PORT", PORT);
});

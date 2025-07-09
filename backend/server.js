// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// const app = express();
// const PORT = 5000;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ✅ Handle preflight OPTIONS requests properly
// // app.options("/*", cors());

// app.use(bodyParser.json());

// const DB_FILE = "./db.json";

// // ✅ Read data from db.json
// const readDB = () => {
//   const data = fs.readFileSync(DB_FILE);
//   return JSON.parse(data);
// };

// // ✅ Write data to db.json
// const writeDB = (data) => {
//   fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
// };

// // ✅ Login route
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;
//   if (email === "admin@example.com" && password === "password") {
//     res.json({ token: "fake-jwt-token" });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// });

// // ✅ Get all leads
// app.get("/api/leads", (req, res) => {
//   const db = readDB();
//   res.json(db.leads);
// });

// // ✅ Add a new lead
// app.post("/api/leads", (req, res) => {
//   const db = readDB();
//   const newLead = { id: uuidv4(), status: "New Lead", ...req.body };
//   db.leads.push(newLead);
//   writeDB(db);
//   res.status(201).json(newLead);
// });

// // ✅ Update lead status
// app.put("/api/leads/:id", (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const db = readDB();
//   const leadIndex = db.leads.findIndex((lead) => lead.id === id);

//   if (leadIndex === -1) {
//     return res.status(404).json({ message: "Lead not found" });
//   }

//   db.leads[leadIndex].status = status;
//   writeDB(db);
//   res.json(db.leads[leadIndex]);
// });

// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// ✅ CORS middleware – clean and simple
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

// ✅ Logging middleware (optional, for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const DB_FILE = "./db.json";

const readDB = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ✅ Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@example.com" && password === "password") {
    res.json({ token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Get all leads
app.get("/api/leads", (req, res) => {
  const db = readDB();
  res.json(db.leads);
});

// ✅ Add a new lead
app.post("/api/leads", (req, res) => {
  const db = readDB();
  const newLead = { id: uuidv4(), status: "New Lead", ...req.body };
  db.leads.push(newLead);
  writeDB(db);
  res.status(201).json(newLead);
});

// ✅ Update lead status
app.put("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = readDB();
  const leadIndex = db.leads.findIndex((lead) => lead.id === id);

  if (leadIndex === -1) {
    return res.status(404).json({ message: "Lead not found" });
  }

  db.leads[leadIndex].status = status;
  writeDB(db);
  res.json(db.leads[leadIndex]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5050;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`>> ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
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

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/leads", (req, res) => {
  const db = readDB();
  res.json(db.leads);
});

app.post("/api/leads", (req, res) => {
  const db = readDB();
  const newLead = { id: uuidv4(), status: "New Lead", ...req.body };
  db.leads.push(newLead);
  writeDB(db);
  res.status(201).json(newLead);
});

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

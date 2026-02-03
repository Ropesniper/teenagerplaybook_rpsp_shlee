const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = "./database.json";
const adminPath = "./admin.json";

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath));
}
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// SIGNUP
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  if (db.users.find(u => u.email === email)) {
    return res.json({ success: false, message: "User already exists" });
  }

  db.users.push({ email, password, history: [] });
  writeDB(db);
  res.json({ success: true });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ success: false });

  res.json({ success: true, email });
});

// ADMIN LOGIN
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  const admin = JSON.parse(fs.readFileSync(adminPath));

  if (username === admin.username && password === admin.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// ADMIN VIEW USERS
app.get("/admin/users", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- DATA STORAGE (temporary) ----------
const users = [
  {
    email: "abc@gmail.com",
    password: "123",
  },
];

// ---------- UTILITY FUNCTION ----------
const userExisting = (email) => users.find((user) => user.email === email);

// ---------- SIGNUP ROUTE ----------
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  console.log("SignUp:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const userExisted = userExisting(email);

  if (userExisted) {
    return res.status(409).json({ // 🔁 Better status code: 409 Conflict
      message: "User already exists!",
    });
  }

  users.push({ email, password });

  return res.status(201).json({
    message: "User created successfully!",
    users, // ⚠️ Only for testing — remove in production
  });
});

// ---------- LOGIN ROUTE ----------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const userExisted = userExisting(email);

  if (!userExisted) {
    return res.status(404).json({ // 🔁 Better status code: 404 Not Found
      message: "User doesn't exist. Please sign up first.",
    });
  }

  if (userExisted.password !== password) {
    return res.status(401).json({ // 🔁 Better status code: 401 Unauthorized
      message: "Incorrect password!",
    });
  }

  return res.status(200).json({
    message: "Login successful!",
  });
});

// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const PORT = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- DATABASE CONNECTION ----------
const uri =
  "mongodb+srv://ramyakanniyappan011:BoiZovD0hhG3yRPq@cluster0.agefew9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.log("❌ MongoDB Error:", err.message);
  }
}

// ---------- UTILITY FUNCTION ----------
const userExisting = async (email) => {
  return await client.db("loginApp").collection("users").findOne({ email });
};

// ---------- SIGNUP ROUTE ----------
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const userExisted = await userExisting(email);

    if (userExisted) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const newUser = await client
      .db("loginApp")
      .collection("users")
      .insertOne({ email, password });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser.insertedId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ---------- LOGIN ROUTE ----------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const userExisted = await userExisting(email);

    if (!userExisted) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    if (userExisted.password !== password) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    return res.status(200).json({
      message: "Login successful!",
      user: userExisted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ---------- UPDATE PASSWORD ROUTE ----------
app.put("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const { oldPassword, newPassword } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing user ID!" });
    }

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required!" });
    }

    const user = await client
      .db("loginApp")
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    const updated = await client
      .db("loginApp")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: newPassword } }
      );

    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ---------- DELETE USER ROUTE ----------
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid MongoDB ID!" });
    }

    const deletedUser = await client
      .db("loginApp")
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  run().catch(console.dir);
});

//ramyakanniyappan011
//BoiZovD0hhG3yRPq

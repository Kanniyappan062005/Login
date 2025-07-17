import express from "express";
import cors from "cors";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const PORT = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- DATA STORAGE (MongoDB) ----------
const uri =
  "mongodb+srv://ramyakanniyappan011:BoiZovD0hhG3yRPq@cluster0.fwp4zmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log("Mongodb error:", err.message);
  }
}

// ---------- UTILITY FUNCTION ----------
const userExisting = async (email) => {
  const user = await client
    .db("loginApp")
    .collection("users")
    .findOne({ email });
  return user;
};

// ---------- SIGNUP ROUTE ----------
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const userExisted = await userExisting(email);

    if (userExisted) {
      return res.status(409).json({
        // 🔁 Better status code: 409 Conflict
        message: "User already exists!",
      });
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
      return res.status(400).json({
        message: "Required Email and Password",
      });
    }

    const userExisted = await userExisting(email);

    if (!userExisted) {
      return res.status(404).json({
        message: "User is not exist!",
      });
    }

    if (userExisted.password !== password) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    return res.status(200).json({
      message: "Login Successfull!",
      user: userExisted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const deletedUser = await client
      .db("loginApp")
      .collection("users")
      .deleteOne({ _id: objectId });
    console.log(deletedUser);

    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({
        message: "User is not exists",
      });
    }

    return res.status(200).json({
      message: "User Deleted Sucessfull!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.put("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const { newPassword } = req.body;

    // ✅ Validate MongoDB ID format
    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing MongoDB user ID",
      });
    }

    // ✅ Validate password
    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    const response = await client
      .db("loginApp")
      .collection("users")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: newPassword } }
      );

    console.log(response); // Optional: debug log

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      message: "Password updated successfully!",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
  run().catch(console.dir);
});

//ramyakanniyappan011
//BoiZovD0hhG3yRPq

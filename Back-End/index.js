import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors())

// Users in Array
const users = [
    {
        email: "kanni@123",
        password: "123",
    }
]

const userExisting = (email) => users.find((user) => user.email === email);


//-------------Sign Up-------------->
app.post("/signup", (req, res) => {
    const { email, password } = req.body;
    console.log("Sign Up:",req.body);

    const userExisted = userExisting(email);

    if (userExisted) {
        return res.status(409).json({
            message: "User is Already Exist, Please Login!"
        });
    }

    users.push({ email, password });
    res.status(201).json({
        message: "User are Created Sucessfully!",
        users,
    });
});

//--------------LOGIN--------------->

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login:",req.body);
    const userExisted = userExisting(email);

    if(!email || !password){
        res.status(400).json({
            message:"Both are Email and Password required!"
        });
    }

    if(!userExisted){
        res.status(401).json({
            message:"User does not Exist, Please Sign Up First",
        })
    }

    if(userExisted.password !== password){
        res.status(401).json({
            message:"Incorrect Password!"
        })
    }

    res.status(200).json({
        message:"Login Sucessfull!",
    })

})

app.listen(8080, () => {
    console.log("Server Started at http://localhost:8080");
});
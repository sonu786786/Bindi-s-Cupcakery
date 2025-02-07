import userModel from "../Models/UserModels.js";
import { comparePassword, hashPassword } from "../Helpher/AuthHelpher.js";
import JWT from "jsonwebtoken";



// REGISTER CONTROLLER
export const registerController = async (req, res) => {
  console.log(req.originalUrl);

  try {
    const { name, email, password, phone, address, answer} = req.body;
    console.log("Received Name:", name);

    // Validations
    if (!name) return res.status(400).send({ message : "Name is Required" });
    if (!email) return res.status(400).send({ message : "Email is Required" });
    if (!password) return res.status(400).send({ message : "Password is Required" });
    if (!phone) return res.status(400).send({ message : "Phone no is Required" });
    if (!address) return res.status(400).send({ message : "Address is Required" });
    if (!answer) return res.status(400).send({ message : "Answer is Required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ // 409 Conflict
        success: false,
        message: "Email already registered, please login",
      });
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Save new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword, 
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};








// LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({ // 401 Unauthorized
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token 
    //generating a JSON Web Token (JWT) after a successful user login
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address, 
        role : user.role
      },
      token,
    });

  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: err.message,
    });
  }
};

//testController

export const testController = (req,res) =>{
    res.send("protected routes")
  }
import JWT from "jsonwebtoken";
import userModel from "../Models/UserModels.js";


//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract only the token part
    console.log("Extracted Token:", token); // Debugging

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    console.log("Decoded User:", decoded); // Debugging
    
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};




//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

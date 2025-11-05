const model = require("../../models/Signup_Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  try {

    console.log("rahul Thapliyal")
    const { email, password } = req.body;

    const user = await model.findOne({ email });
    if (!user) {
      return res.json({ status: "error", message: "User not found :(" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ status: "error", message: "Password doesn't match :(" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "MY_SECRET_KEY",
      { expiresIn: "1d" } 
    );

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,      
      secure: false,        
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.json({
      status: "ok",
      message: "Successfully logged in ✅"
    });

  } catch (error) {
    console.error("Error in signin process:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = signin;

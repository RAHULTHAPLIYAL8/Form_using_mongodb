const model=require("../../models/Signup_Schema");
const bcrypt=require("bcrypt")

const signin=async(req,res)=>
{
    try {
        const { email, password } = req.body;
    
        const user = await model.findOne({ email: email });
        if (user) {
          console.log("User found Successfully!!!!!!!!!!!!!!!");
    
          bcrypt.compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                console.log("Password match successfully");
                res.json({ status: "ok", message: "Successfully logged in" });
              } else {
                res.json({ status: "error", message: "Password doesn't match :(" });
              }
            })
            .catch((err) => {
              console.error("Error in password comparison:", err);
            });
        } else {
          res.json({ status: "error", message: "User not found :(" });
        }
      } catch (error) {
        console.error("Error in signin process:", error);
        console.log("Intenal Server Error");
      }
}

module.exports=signin;
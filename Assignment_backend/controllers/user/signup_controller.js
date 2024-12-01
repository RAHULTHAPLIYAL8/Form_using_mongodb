const model=require("../../models/Signup_Schema");
const bcrypt=require("bcrypt")
const signup=async (req,res)=>
{
    try{
        console.log(req.body)
        const { name, email, dob, number, password} = req.body;
        const unique = await model.findOne({ email });
        if (unique) {
          res.json({ status:"error", message: "Email already exists" });
          return;
        }
        const salt = await bcrypt.genSalt(10);  
        const hashpassword = await bcrypt.hash(password, salt); 
        const newUser = new model({ name,email,dob,number:Number(number),password:hashpassword });
        const savedUser = await newUser.save();
        if(savedUser)
        {
            res.json({status:"ok",message:"You are Signed up Successfully"});
        }
    }catch(err)
    {
        console.log(err);
    }
}

module.exports=signup;
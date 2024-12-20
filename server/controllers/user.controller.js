const Usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation for required fields
  if (!name || !email || !password) {
    return res.status(400).send({ message: "Please fill all fields" });
  }

  // Validation to ensure 'role' is not passed
  if (req.body.role) {
    return res.status(400).send({ message: "Role cannot be sent in the request body" });
  }

  try {
    // Check if user already exists
    const userExist = await Usermodel.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create the user
    await Usermodel.create({ name, email, password: hashedPassword });

    // Success response
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};


const signin=async(req,res)=>{
    const { name, email, password } = req.body;

    // Validation for required fields
    if (!name || !email || !password) {
      return res.status(400).send({ message: "Please fill all fields" });
    }

    const userExist = await Usermodel.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: "User already exists" });
    }
    bcrypt.compare(password,userExist.password,function(err,result){
        if(err){
            return res.status(400).send({ message: "Error in comparing....."});
        }
        if(result){
            const {password,...rest}=userExist._doc;
            jwt.sign({userid:rest},process.env.privatekey , function(err,token){
                if(err){
                    return res.status(400).send({ message: "Error in generating token....."});
                }
                res
                  .cookie("verificationtoken", token)
                  .status(200)
                  .json({ message: "User logged in successfully", userData:rest });
            });
        
        } else{
            return res.status(400).send({ message: "Invalid password" });
        }
    })
  
}
module.exports = {signin, signup };


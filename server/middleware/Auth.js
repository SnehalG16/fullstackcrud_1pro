const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, send) => {
  const { verificationtoken } = req.cookies;
  if (!verificationtoken)
    return res.status(401).send({ message: "Please login first" });

  jwt.verify(
    verificationtoken,
    process.env.privatekey,
    function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      req.user = decoded.userid;
      next();
    }
  );
};
module.exports=auth;

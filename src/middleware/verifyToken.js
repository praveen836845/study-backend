const jwt = require("jsonwebtoken");

 const verifyUser = (req, res, next) =>{
  // const token = req.header("auth-token");
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(400).send("access-denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
      console.log("verifying");
      if (err) return res.sendStatus(403); //invalid token
      console.log(decoded);
      req.body.id = decoded._id; //for correct token
    });
    req.user = verified;
  } catch (err) {
    res.status(400).send("invalid token");
  }
  next();
};

module.exports = verifyUser;

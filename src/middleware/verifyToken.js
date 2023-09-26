const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).send("access-denied");
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (err, decoded) => {
        console.log("verifying");
        if (err) {
          return res.status(403).send(
            JSON.stringify({
              err: "invalid token",
            })
          );
        } //invalid token
        else {
          console.log(decoded);
          req.body.id = decoded._id; //for correct token
          // req.user = verified;
          next();
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err.toString());
  }
};

module.exports = verifyUser;

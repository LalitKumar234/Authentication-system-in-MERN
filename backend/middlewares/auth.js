const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = String(req.headers.authorization)
    .replace(/^bearer|^jwt/i, "")
    .replace(/^\s+|\s+$/gi, "");
    
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid Token" });
  }
};
module.exports = auth;

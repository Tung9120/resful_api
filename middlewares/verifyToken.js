const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  console.log('token',token);
  if (!token) {
    res.json({ msg: "Access denied" });
    return;
  }

  const verified = jwt.verify(token, process.env.token);
  req.user = verified;
  next();
}

module.exports = auth;

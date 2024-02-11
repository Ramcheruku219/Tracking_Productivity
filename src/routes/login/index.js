
const { User } = require("../../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../../../src/routes/login/jwtconfig");

const controller = {};

controller.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username }});

    if (!user) {
      return res.status(401).json({ message: "User not found"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password"});
    }

    const token = jwt.sign(
      { username: username, id: user.id },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiresIn, // You can adjust the token expiration time
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(`File: login.js, Func: login, Error: ${err}`);
    res.status(500).json({ message: "Internal Server Error during login" });
  }
};

controller.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);

    if (decoded && decoded.hasOwnProperty("username")) {
      req.id = decoded.id;
      next();
    } else {
      res.status(403).json({ message: "Token Expired or Invalid!" });
    }
  } catch (err) {
    console.error(`File: login.js, Func: authenticate, Error: ${err}`);
    res.status(403).json({ message: "Token Expired or Invalid!" });
  }
};

module.exports = controller;

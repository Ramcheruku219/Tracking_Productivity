const { User } = require("../../../models/index");
const bcrypt = require("bcrypt");

let controller = {};

controller.create = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Hash the user's password before storing it
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Error creating user" });
      }
      try {
        let user = await User.create({ username, password: hash });
        res.json(user);
      } catch (createErr) {
        console.error(`Error creating user: ${createErr}`);
        return res.status(500).json({ error: "Error creating user" });
      }
    });
  } catch (err) {
    console.log(`File: Users/User.controller/Func: create, Error: ${err}`);
  }
};

controller.getAll = async (req, res) => {
  try {
    let users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(`File: Users/User.controller/Func: getAll, Error: ${err}`);
  }
};

controller.find = async (req, res) => {
  try {
    let id = req.params.id;
    let users = await User.findOne({ where: { id: id } });
    res.json(users);
  } catch (err) {
    console.log(`File: Users/User.controller/Func: findOne, Error: ${err}`);
  }
};

controller.update = async (req, res) => {
  try {
    let id = req.params.id;
    let { username, password } = req.body;
    let user = await User.findOne({ where: { id: id } });

    user.username = username;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(`File: Users/User.controller/Func: update, Error: ${err}`);
  }
};

controller.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({ where: { id: id } });
    await user.destroy();
    res.json({ msg: "user deletion is successful" });
  } catch (err) {
    console.log(`File: Users/User.controller/Func: delete, Error: ${err}`);
  }
};

module.exports = controller;

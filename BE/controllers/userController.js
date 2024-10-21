const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

const User = require("../models").User;

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPassword = hashPassword(password);
    const user = await User.create({ email, password: encryptedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    let user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    let compare = comparePassword(password, user.password);
    if (!compare) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    let token = createToken({
      id: user.id,
    });

    res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error." });
  }
};

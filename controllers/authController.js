const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  const { username, email, password, firstName, lastName, birthDate, gender } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "Tous les champs requis ne sont pas remplis" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ error: "Email déjà utilisé" });

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPwd,
    firstName,
    lastName,
    birthDate,
    gender,
  });

  

  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(201).json({
    message: "Utilisateur créé",
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      birthDate: newUser.birthDate,
      gender: newUser.gender,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      gender: user.gender,
    },
  });
};

module.exports = {
  register,
  login,
};

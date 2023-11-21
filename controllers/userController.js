const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Get  all users
// @route GET /api/users/
// @access public

const getAllUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Users List" });
});

// @desc Register user
// @route GET /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created: ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc login user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  //   compare pass with hash pass
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// @desc Get current info of user
// @route GET /api/users/:id
// @access public

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc Update single user
// @route PUT /api/users/update/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
  const user = await Contact.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  //   const updatedContact = await Contact.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     { new: true }
  //   );
  res.status(200).json(updatedContact);
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  getAllUsers,
};

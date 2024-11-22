const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "yourSecretKey";

const register = async (req, res) => {
  //check any filled is empty
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "all the fields are required",
        success: false,
      });
    }

    // check if user exist with the email.
    let user = await User.find({ email: email });
    // console.log(user);

    if (user.email) {
      return res.status(400).json({
        message: "User already exist with this email!",
        success: false,
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user - register user
    let newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    newUser.password = undefined;

    console.log("User registered successfully");

    res.status(201).json({
      message: "registered successfully",
      user: newUser,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//generate token
const generateToken = (userId) => {
  const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: "1d" });
  return token;
};

//login function
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //check fields
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "all the fields are required",
        success: false,
      });
    }

    //fetch user from database
    const user = await User.findOne({ email: email }).select("+password");

    if (!user)
      return res.status(404).json({
        message: "Incorrect email or password",
        status: false,
      });

    //match password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(404).json({
        message: "incorrect password or role",
      });

    //check role
    if (user.role != role)
      return res.status(404).json({
        message: "incorrect credentials!",
        status: false,
      });

    //generate token
    const token = generateToken(user._id);

    user.password = undefined;

    //send response to server
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        user: user,
        message: `Welcome back ${user.fullname}`,
        success: true,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
      success: false,
    });
  }
};

// logout
const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//update profile
const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber } = req.body;

    const userId = req.id; //middleware authentication

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    let newuser = await User.findByIdAndUpdate(
      userId,
      {
        fullname: fullname,
        phoneNumber: phoneNumber,
      },
      { new: true }
    );

    res.status(200).json({
      message: "profile updated successfully",
      success: true,
      user: newuser,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
};

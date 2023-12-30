const { User } = require("../models/UserModel");
const jwt = require("jsonwebtoken")

const getUser = async (req, res) => {
  const token = req.params.token;
  const { id, email } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findById(id, {
      password: 0,
      email_verified: 0,
      is_google: 0,
      __v: 0,
    })
      .populate("projects", "name")
      .populate("uploads");
    if (user) res.send({ success: true, user: user });
    else res.end({ success: false, message: "User not found" });
  } catch (err) {
    res.send({ success: false, message: "User not found" });
  }
};

module.exports = { getUser };

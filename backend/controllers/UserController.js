const { User } = require("../models/UserModel");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      password: 0,
      email_verified: 0,
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

const { User } = require("../../models/x1UserModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

function createJwtToken(email, id) {
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "720h",
  });
  return token;
}

const googleAuth = async (req, res) => {
  if (req.body.byGoogle) {
    // google signup
    const { googleAccessToken } = req.body;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const user = response.data;
        const userExist = await User.findOne({ email: user.email });

        // login
        if (userExist) {
          const token = await createJwtToken(userExist.email, userExist._id);
          res.send({ success: true, token });
          return;
        }
        // signup
        const newUser = new User({
          name: user.name,
          email: user.email,
          is_google: true,
          email_verified: true,
        });
        await newUser.save();
        // creating a jwt token for future login
        const token = await createJwtToken(newUser.email, newUser._id);
        // sending response to frontend
        res.send({
          success: true,
          token,
        });
      })
      .catch(() => {
        res.send({
          success: false,
          message: "An error occured. Please try again.",
        });
      });
  }
};

module.exports = { googleAuth };

const { User } = require("../models/UserModel");

const getUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id, {
      password: 0,
      email_verified: 0,
      is_google: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    })
      .populate("projects", ["name", "updatedAt", "folder", "thumbnail"])
      .populate("folders", ["-owner", "-__v"])
      .populate("uploads");
    if (user) res.send({ success: true, user: user });
    else res.end({ success: false, message: "User not found" });
  } catch (err) {
    res.send({ success: false, message: "User not found" });
  }
};

module.exports = { getUser };

/*
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const testFunc = async (req, res) => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
    console.log(url);
  } catch (err) {
    console.log(err);
  }
};

const testFunc2 = async (req, res) => {
  // console.log(req.headers);
  const { code } = req.headers;
  console.log("code: ", code);

  const { tokens } = await oAuth2Client.getToken(code); // exchange code for tokens
  console.log(tokens);

  // Use access_token or id_token to fetch user profile
  const response = await axios.get(
    // "https://www.googleapis.com/oauth2/v1/userinfo",
    "https://www.googleapis.com/drive/v2/files",
    {
      params: {
        q: "mimeType='image/jpeg' or mimeType='image/png'", // Add more image MIME types if needed
      },
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }
  );
  res.send(response.data);
};

module.exports = { getUser, testFunc, testFunc2 };
*/

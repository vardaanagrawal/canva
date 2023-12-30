const { User } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const axios = require("axios");

// //-----------------------------------------------------------------------------------------

const sendVerificationMail = async (name, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawalvardaan85@gmail.com",
      pass: "rixlhcribeykqygz",
    },
  });
  // const jwtToken = generateJWT({ email, id });
  const verificationLink = `${process.env.FRONTEND_URL}/emailVerification/${email}`;
  // sending email
  var mailOptions = {
    from: "agrawalvardaan85@gmail.com",
    to: email,
    subject: "Email Verification",
    // text: ,
    html: `<strong>Verification link</strong><br/><br/><a href=${verificationLink}><button>Click to verify</button></a>`,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (err) {
    return { status: 400 };
  }

  return { status: 200 };
};

const signup = async (req, res) => {
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
        // checking if user already registered
        const userExist = await User.findOne({ email: user.email });
        if (userExist) {
          res.send({ success: false, message: "User already registered" });
          return;
        }
        // if user does not exist
        const newUser = new User({
          name: user.name,
          email: user.email,
          is_google: true,
          email_verified: true,
        });
        await newUser.save();
        // creating a jwt token for future login
        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "720h" }
        );
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
  } else {
    // normal signup
    const user = req.body;
    // checking if user already registered
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      res.send({ success: false, message: "User already registered" });
      return;
    }

    // encrypting password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    // sending verification mail
    const response = await sendVerificationMail(user.name, user.email);
    if (response.status == 400) {
      throw "mail not sent";
    }
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: password,
      is_google: false,
    });
    await newUser.save();
    res.send({
      success: true,
      message: "Email sent for verification",
    });
  }
};

// //-----------------------------------------------------------------------------------------
const login = async (req, res) => {
  if (req.body.byGoogle) {
    // google login
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const user = await User.findOne({ email: response.data.email });
        if (!user) {
          res.send({ success: false, message: "User not registered" });
          return;
        }
        if (!user.is_google && !user.email_verified) {
          res.send({ success: false, message: "Email not verified." });
          return;
        }
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "720h" }
        );
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
  } else {
    // normal login
    const user = req.body;
    const userExist = await User.findOne({ email: user.email });
    if (!userExist) {
      res.send({ success: false, message: "User not registered" });
      return;
    }
    if (userExist && userExist.email_verified === false) {
      res.send({ success: false, message: "Email not verified" });
      return;
    }
    if (!userExist.password && userExist.is_google) {
      res.send({
        success: false,
        message: "Login failed, try to login with google",
      });
      return;
    }
    const passwordMatch = await bcrypt.compare(
      user.password,
      userExist.password
    );
    if (!passwordMatch) {
      res.send({ success: false, message: "Invalid Credential" });
    } else {
      // creating a jwt token for future login
      const token = jwt.sign(
        {
          email: userExist.email,
          id: userExist._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "720h" }
      );
      res.send({
        success: true,
        token,
      });
    }
  }
};

// -------------------------------------------------------------------------------------------------

const verifyEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { email_verified: true }
    );
    res.send({
      success: true,
      message: "Email verified",
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Email not verified",
    });
  }
};

module.exports = { signup, login, verifyEmail };

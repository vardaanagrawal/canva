const { User } = require("../../models/x1UserModel");
const { Otp } = require("../../models/OtpModel");

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

const checkEmail = async (req, res) => {
  const email = req.params.email;
  const userExist = await User.findOne({ email });
  // send for further process of signing up
  if (!userExist) {
    res.send({
      email_exist: false,
    });
  }
  // user already exist so starting login process
  else {
    const code = 123456;
    var mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: `${code} is your Canva code`,
      text: `Enter ${code} in the next 10 minutes to verify your account`,
    };

    try {
      await transporter.sendMail(mailOptions);
      await Otp.findOneAndUpdate(
        { email: email },
        { email, code, expires: new Date(Date.now() + 10 * 60 * 1000) },
        { upsert: true }
      );
      res.send({
        email_exist: true,
        password_exist: false,
      });
    } catch (err) {
      res.send({
        success: false,
        message: "Some error occured, please try again",
      });
    }
  }
};

const sendVerificationCode = async (req, res) => {
  const email = req.params.email;
  const code = 123456;
  var mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: `${code} is your Canva code`,
    text: `Enter ${code} in the next 10 minutes to verify your account`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await Otp.findOneAndUpdate(
      { email: email },
      { email, code, expires: new Date(Date.now() + 10 * 60 * 1000) },
      { upsert: true }
    );
    res.send({
      success: true,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Some error occured, please try again",
    });
  }
};

const verifyCode = async (req, res) => {
  const email = req.body.email;
  const method = req.body.method;
  const code = req.body.code;
  const name = req.body.name;
  const codeInDb = await Otp.findOne({ email: email });
  if (!codeInDb || codeInDb.code != code) {
    res.send("code incorrect or expired");
  }

  if (method === "login") {
    const user = await User.findOne({ email: email });
    // creating a jwt token for future login
    const token = jwt.sign(
      {
        email: email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "720h" }
    );
    res.send({
      success: true,
      token,
    });
  } else {
    const newUser = new User({
      name: name,
      email: email,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        email: email,
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "720h" }
    );
    res.send({
      success: true,
      token,
    });
  }
};

module.exports = {
  checkEmail,
  sendVerificationCode,
  verifyCode,
};

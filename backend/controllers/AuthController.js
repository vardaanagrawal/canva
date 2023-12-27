const { User } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

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
  const user = req.body;
  console.log(user);
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    const response = await sendVerificationMail(user.name, user.email);
    console.log(response);
    if (response.status == 400) {
      throw "mail not sent";
    }
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: password,
    });
    await newUser.save();
    res.send({
      success: true,
      message: "User Registered Successfully",
      userId: user._id,
    });
  } catch (e) {
    console.log(e);
    res.send({
      success: false,
      message: "Email already registered",
    });
  }
};

// //-----------------------------------------------------------------------------------------
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    res.send({ success: false, message: "Invalid Credential" });
  } else {
    if (userExist.email_verified == false)
      res.send({ success: false, message: "Email not verified" });
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      res.send({ success: false, message: "Invalid Credential" });
    } else {
      res.send({
        success: true,
        message: "Login Successfull",
        userId: userExist._id,
      });
    }
  }
};

// -------------------------------------------------------------------------------------------------

const verifyEmail = async (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { email_verified: true }
    );
    console.log(user);
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

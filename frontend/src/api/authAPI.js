import axios from "axios";

// const base_url = "http://localhost:4000";
const base_url = "";

// auth apis ####################################################################
// ##############################################################################
// email auth ###################################################################

export async function checkEmail(email) {
  const res = await axios.get(`${base_url}/api/auth/check-email/${email}`);
  return res.data;
}

export async function sendVerificationCode(email) {
  const res = await axios.post(
    `${base_url}/api/auth/send-verification-mail/${email}`
  );
  return res.data;
}

export async function verifyCode(data) {
  const res = await axios.post(`${base_url}/api/auth/verify-code`, data);
  return res.data;
}

// google auth ##################################################################

export async function googleAuth(data) {
  const res = await axios.post(`${base_url}/api/auth/google`, data);
  return res.data;
}

import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../api/authAPI";

export default function Verification() {
  useEffect(() => {
    const url = window.location.href;
    const email = url.split("/")[4];
    console.log(email);
    handleEmailVerification(email);
  }, []);

  async function handleEmailVerification(email) {
    const res = await verifyEmail({ email });
    if (res.success) {
      setStatus("Email Verified Successfully");
      
    } else {
      setStatus("Email Not Verified");
    }
    console.log(res);
  }

  const [status, setStatus] = useState("Verifying...");

  return <div className="verification">{status}</div>;
}

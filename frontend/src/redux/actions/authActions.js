import * as api from "../../api/authAPI";

export const googleAuth = (accessToken, navigate, setLoading) => async () => {
  try {
    const data = await api.googleAuth({
      googleAccessToken: accessToken,
      byGoogle: true,
    });
    if (data.success) {
      localStorage.setItem("Canva_User", data.token);
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      alert(data.message);
      return data;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

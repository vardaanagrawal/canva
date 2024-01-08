import * as api from "../../api/authAPI";

export const signup = (formData, navigate, setLoading) => async () => {
  try {
    const { data } = await api.signUp({ ...formData, byGoogle: false });
    if (data.success) {
      setLoading(0);
      alert(data.message);
    } else {
      setLoading(0);
      alert(data.message);
      return data;
    }
  } catch (err) {
    console.log(err);
    setLoading(0);
  }
};

export const signupGoogle = (accessToken, navigate, setLoading) => async () => {
  try {
    const { data } = await api.signUp({
      googleAccessToken: accessToken,
      byGoogle: true,
    });
    if (data.success) {
      localStorage.setItem("Canva_User", data.token);
      setLoading(0);
      navigate("/");
    } else {
      setLoading(0);
      alert(data.message);
      return data;
    }
  } catch (err) {
    setLoading(0);
    console.log(err);
  }
};

export const signin = (formData, navigate, setLoading) => async () => {
  try {
    const { data } = await api.signIn({ ...formData, byGoogle: false });
    if (data.success) {
      localStorage.setItem("Canva_User", data.token);
      setLoading(0);
      navigate("/");
    } else {
      setLoading(0);
      alert(data.message);
      return data;
    }
  } catch (err) {
    setLoading(0);
    console.log(err);
  }
};

export const signinGoogle = (accessToken, navigate, setLoading) => async () => {
  try {
    const { data } = await api.signIn({
      googleAccessToken: accessToken,
      byGoogle: true,
    });
    if (data.success) {
      localStorage.setItem("Canva_User", data.token);
      setLoading(0);
      navigate("/");
    } else {
      setLoading(0);
      alert(data.message);
      return data;
    }
  } catch (err) {
    setLoading(0);
    console.log(err);
  }
};

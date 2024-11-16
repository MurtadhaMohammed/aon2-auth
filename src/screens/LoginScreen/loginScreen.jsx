import { useState } from "react";
import { useAppStore } from "../../sotre";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsLogin } = useAppStore();
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    const resp = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const jsonResp = await resp.json();
    setLoading(false);
    if (jsonResp?.token) {
      localStorage.setItem("fake_token", jsonResp?.token);
      setIsLogin(true);
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Login Screen</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={login}>{loading ? "Loadin..." : "Login"}</button>
    </div>
  );
};

export default LoginScreen;

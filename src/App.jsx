import { Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import AboutScreen from "./screens/AboutScreen/aboutScreen";
import { useAppStore } from "./sotre";
import LoginScreen from "./screens/LoginScreen/loginScreen";
import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<ProtectedRoute Component={HomeScreen} />} />
        <Route
          path="/about"
          element={<ProtectedRoute Component={AboutScreen} />}
        />
      </Routes>
    </div>
  );
}

const ProtectedRoute = ({ Component }) => {
  const { isLogin, setIsLogin } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("fake_token");
    if (token) setIsLogin(true);
    else setIsLogin(false);
    setLoading(false);
  }, []);

  if (loading) return "";
  else if (isLogin) return <Component />;
  else return <Navigate to={"/login"} />;
};

export default App;

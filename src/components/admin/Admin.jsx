import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = () => {
  if (email === "star-car@rental.com" && password === "rent300") {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // ✅ تخزين تسجيل الدخول
    navigate("/");
  } else {
    setError("البريد أو الباسورد غير صحيح");
  }
};


  return (
    <div className="login-page">
      <div className="glass-card">
        <p className="subtitle">تسجيل الدخول إلى النظام</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">تسجيل الدخول</button>
        </form>

        {/* رسالة خطأ */}
        {error && <p className="error-message">{error}</p>}

        <p className="forgot">نسيت كلمة المرور؟ <a href="https://api.whatsapp.com/send?phone=201025547663&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%F0%9F%91%8B" target="_blank">اضغط هنا</a></p>
      </div>
    </div>
  );
}

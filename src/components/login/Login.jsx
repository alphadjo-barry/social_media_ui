import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import Input from "../inputs/text/Input.jsx";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import "./Login.css";
import { NavLink, useNavigate } from "react-router";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAuthentication = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:8080/api/v1/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const jwt = await response.json();
    console.log("Serveur response : ", jwt.token);

    Cookies.set("token", jwt.token, {
      path: "/",
      expires: 1,
      sameSite: "Strict",
      readOnly: true
    });

    navigate("/dashboard", { replace: true });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `url("https://images.unsplash.com/photo-1508873699372-7ae0b2e42f66?auto=format&fit=crop&w=1600&q=80")`, // <-- ICI ton image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="row"
        style={{ width: "90%", height: "100vh", backdropFilter: "blur(2px)" }}
      >
        <div className="col-md-8 d-flex justify-content-center align-items-center text-white">
          <div className="text-center px-4 text-dark">
            <h2 className="fw-bold">Welcome to Connectify</h2>
            <p className="mt-3">
              Connectify is your modern social network designed to help you stay
              connected with the people who matter most. Share moments, build
              meaningful relationships, and grow within a community that
              supports you every day.
            </p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center border-left border-bottom">
          <div
            className="shadow-lg p-4 rounded-4 form"
            style={{ width: "550px", backgroundColor: "#ffffff" }}
          >
            <h4 className="text-start mb-5"> connect to connectivity</h4>
            <form>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label d-flex align-items-center"
                >
                  <span className="input-group-text bg-light border-0">
                    <FaUser />
                  </span>
                  Mail address
                </label>
                <div className="input-group">
                  <Input
                    type="text"
                    value={email}
                    className="form-control rounded shadow-lg border border-secondary p-2"
                    id="username"
                    placeholder="Enter your mail address"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="current-email"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label d-flex align-items-center "
                >
                  <span className="input-group-text bg-light border-0">
                    <FaLock />
                  </span>
                  Password
                </label>
                <div className="position-relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="form-control rounded shadow-lg border border-secondary p-2"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: 10 }}
                    autoComplete="current-password"
                  />

                  <span
                    className="d-flex align-content-end input-group-text bg-light border-0"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: 10,
                      top: 5
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </span>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg "
                  disabled={email === "" || password === ""}
                  onClick={handleAuthentication}
                >
                  Se connecter
                </button>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <a href="#" className="text-decoration-none text-dark">
                  Password forgot ?
                </a>
                <p>
                  <NavLink
                    to="register"
                    className="text-decoration-none text-dark"
                  >
                    Create an account
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

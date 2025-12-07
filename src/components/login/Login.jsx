import { FaUser, FaLock } from "react-icons/fa";
import {useEffect, useState} from "react";
import Input from "../inputs/text/Input.jsx";
import {IoEye} from "react-icons/io5";
import {IoMdEyeOff} from "react-icons/io";
import "./Login.css";
import {NavLink} from "react-router";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        console.log(`email : ${email}, password : ${password}`);
    }, [email, password]);
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: "100vh", backgroundColor: "#f0f2f5"}}>
            <div className="row" style={{width: "90%", height: "100vh"}}>

                <div
                    className="col-md-8 d-flex justify-content-center align-items-center text-white">
                    <div className="text-center px-4 text-dark">
                        <h2 className="fw-bold">Welcome to Connectify</h2>
                        <p className="mt-3">
                            Connectify is your modern social network designed to help you stay connected with the people who matter most.
                            Share moments, build meaningful relationships, and grow within a community that supports you every day.
                        </p>
                    </div>
                </div>

                <div className="col-md-4 d-flex justify-content-center align-items-center border-left border-bottom">
                    <div className="shadow-lg p-4 rounded-4 form" style={{width: "550px", backgroundColor: "#ffffff"}}>
                        <h4 className="text-start mb-5"> connect to connectivity</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label d-flex align-items-center">
                                    <span className="input-group-text bg-light border-0"><FaUser /></span>Mail address
                                </label>
                                <div className="input-group">
                                    <Input
                                        type="text"
                                        classeName="form-control rounded shadow-lg border border-secondary p-2"
                                        id="username"
                                        placeholder="Enter your mail address"
                                        onChange={ handleEmailChange }
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label d-flex align-items-center ">
                                    <span className="input-group-text bg-light border-0"><FaLock /></span>Password
                                </label>
                                <div className="input-group" style={{position: "relative"}}>
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        classeName="form-control rounded shadow-lg border border-secondary p-2"
                                        id="password"
                                        placeholder="Enter your password"
                                        onChange={ handlePasswordChange }
                                        style={{ paddingRight: 10 }}
                                    />

                                    <span
                                        className="d-flex align-content-end input-group-text bg-light border-0"
                                        style={{ cursor: "pointer", position: "absolute", right: 10, top: 5}}
                                        onClick={handleShowPassword}
                                    >
                                    {showPassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
                                    </span>
                                </div>

                            </div>

                            <div className="d-grid mt-4">
                                <button type="submit" className="btn btn-primary btn-lg " disabled={email === "" || password === ""}>Se connecter</button>
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                                <a href="#" className="text-decoration-none text-dark">Password forgot ?</a>
                                <p><NavLink to="register" className="text-decoration-none text-dark">Create an account</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;

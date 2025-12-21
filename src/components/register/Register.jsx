import { useEffect, useState } from "react";
import { FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import Input from "@components/inputs/text/Input.jsx";

import { MdEmail } from "react-icons/md";
import Select from "@components/inputs/select/Select.jsx";
import { useJourHook } from "@hooks/useJourHook.jsx";
import { useMoisHook } from "@hooks/useMoisHook.jsx";
import { useAnneeHook } from "@hooks/useAnneeHook.jsx";
import useGenreHook from "@hooks/useGenreHook.jsx";
import { IoMdEyeOff } from "react-icons/io";
import {IoEye, IoMan, IoWoman} from "react-icons/io5";
import { RiQuestionMark } from "react-icons/ri";
import { useRegisterValidation } from "@validations/useRegisterValidation.jsx";
import {NavLink, useNavigate} from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [selectedJour, setSelectedJour] = useState("");
  const [selectedMois, setSelectedMois] = useState("");
  const [selectedAnnee, setSelectedAnnee] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [error, setError] = useState("");

  const { jours } = useJourHook();
  const { mois } = useMoisHook();
  const { annees } = useAnneeHook();
  const { genres } = useGenreHook();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const { registerSchema } = useRegisterValidation();

  useEffect(() => {
    if (selectedJour && selectedMois && selectedAnnee) {
      const newDate = new Date(
        Number(selectedAnnee),
        Number(selectedMois) - 1,
        Number(selectedJour)
      ).toLocaleDateString("fr-FR");
      setBirthDay(newDate);
    }
  }, [selectedJour, selectedMois, selectedAnnee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      email,
      phone,
      selectedJour,
      selectedMois,
      selectedAnnee,
      genre: selectedGenre,
      password,
      confirmPassword,
    };

    try {
      await registerSchema.validate(data, { abortEarly: false });
    } catch (ValidationError) {
      const formattedErrors = {};
      ValidationError.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
      console.log(formattedErrors);
      return;
    }

    data = {
        firstName,
        lastName,
        email,
        phone,
        birthday: birthDay,
        genre: selectedGenre,
        password
    };

    try {
        const response = await fetch("http://localhost:8080/api/v1/utilisateurs/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if(!response.ok){
            const errorData = await response.json();
            console.log('Backend error : ', errorData)
            throw new Error(errorData.message || "Registration failed");
        }

        navigate("/account-validation", { replace: true });
    }
    catch (err) {
        setError(err.message);
        console.log("erreur : ", err);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5 text-white rounded-3 p-3"
    >
      <div className="row">
        <div className="col-md-6 d-flex justify-content-start align-items-center text-white">
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

        <div className="col-md-6 d-flex justify-content-end align-items-center mt-5">

          <div
            className="shadow-lg p-3 rounded-4"
            style={{ width: "620px", backgroundColor: "#ffffff" }}
          >
            {error && (
                <div
                    className="alert alert-danger p-3 d-flex align-items-center"
                    style={{ height: "40px", fontSize: "12px", fontWeight: "bold"}}
                >
                  <p className="error-message">{error}</p>
                </div>
            )}
            <h4 className="text-start mb-3 fw-bold" style={{ fontSize: "19px", color: "blue"}}> Create an connectify account</h4>
            <form>
              <div className="row">
                <div className="col mb-1">
                  <label
                    htmlFor="firstname"
                    className="form-label d-flex align-items-center"
                  >
                    <span className="input-group-text bg-light border-0">
                      <FaUser />
                    </span>
                    Firstname
                  </label>
                  <div className="input-group">
                    <Input
                      type="text"
                      value={firstName}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                      id="username"
                      placeholder="Enter your firstname"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {errors.password && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.firstName}{" "}
                    </small>
                  )}
                </div>

                <div className="col mb-1">
                  <label
                    htmlFor="lastname"
                    className="form-label d-flex align-items-center   "
                  >
                    <span className="input-group-text bg-light border-0">
                      <FaUser />
                    </span>
                    Lastname
                  </label>
                  <div className="input-group">
                    <Input
                      type="text"
                      value={lastName}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                      id="lastname"
                      placeholder="Enter your lastname"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {errors.lastName && (
                    <small className="text-danger fw-bold" style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.lastName}{" "}
                    </small>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col mb-1">
                  <label
                    htmlFor="username"
                    className="form-label d-flex align-items-center   "
                  >
                    <span className="input-group-text bg-light border-0">
                      <MdEmail />
                    </span>
                    Mail address
                  </label>
                  <div className="input-group">
                    <Input
                      type="text"
                      value={email}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="address_mail"
                      placeholder="Enter your mail address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.email}{" "}
                    </small>
                  )}
                </div>

                <div className="col mb-1">
                  <label
                    htmlFor="phone"
                    className="form-label d-flex align-items-center   "
                  >
                    <span className="input-group-text bg-light border-0">
                      <FaPhoneAlt />
                    </span>
                    Phone
                  </label>
                  <div className="input-group">
                    <Input
                      type="text"
                      value={phone}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      placeholder="Enter your phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {errors.phone && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.phone}{" "}
                    </small>
                  )}
                </div>
              </div>

              <div className="row p-0">
                <label
                  htmlFor="firstname"
                  className="form-label d-flex align-items-center   "
                >
                  Date de naissance
                  <span className="input-group-text bg-light border-0 p-2">
                    <RiQuestionMark />
                  </span>
                </label>
                <div className="col mb-1">
                  <div className="input-group">
                    <Select
                      options={jours}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.selectedJour ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setSelectedJour(e.target.value)}
                      placeholder="jour"
                    />
                  </div>
                  {errors.selectedJour && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.selectedJour}{" "}
                    </small>
                  )}
                </div>
                <div className="col mb-1">
                  <div className="input-group">
                    <Select
                      options={mois}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.selectedMois ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setSelectedMois(e.target.value)}
                      placeholder="mois"
                    />
                  </div>
                  {errors.selectedMois && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.selectedMois}{" "}
                    </small>
                  )}
                </div>
                <div className="col mb-1">
                  <div className="input-group">
                    <Select
                      options={annees}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.selectedAnnee ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setSelectedAnnee(e.target.value)}
                      placeholder="annee"
                    />
                  </div>
                  {errors.selectedAnnee && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.selectedAnnee}{" "}
                    </small>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col mb-1">
                  <label
                    htmlFor="firstname"
                    className="form-label d-flex align-items-center   "
                  >
                    Genre
                    <span className="input-group-text bg-light border-0 p-2">
                      <IoWoman /> / <IoMan />
                    </span>
                  </label>
                  <div className="input-group">
                    <Select
                      options={genres}
                      className={`form-control rounded shadow-lg border border-secondary p-2 ${
                        errors.selectedGenre ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      placeholder="Genre"
                    />
                  </div>
                  {errors.genre && (
                    <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                      {" "}
                      {errors.genre}{" "}
                    </small>
                  )}
                </div>
              </div>

              <div className="col mb-1">
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
                    className={`form-control rounded shadow-lg border border-secondary p-2 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-focus"
                  />

                  {
                    <span
                      className="d-flex align-content-end input-group-text bg-light border-0"
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 5,
                        top: 5,
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <IoMdEyeOff size={20} />
                      ) : (
                        <IoEye size={20} />
                      )}
                    </span>
                  }

                    {errors.password && (
                        <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                            {" "}
                            {errors.password}{" "}
                        </small>
                    )}
                </div>
              </div>

              <div className="col mb-1">
                <label
                  htmlFor="confirm_password"
                  className="form-label d-flex align-items-center "
                >
                  <span className="input-group-text bg-light border-0">
                    <FaLock />
                  </span>
                  Confirm password
                </label>
                <div className="position-relative">
                  <Input
                    type={showPasswordConfirm ? "text" : "password"}
                    value={confirmPassword}
                    className={`form-control rounded shadow-lg border border-secondary p-2 ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="password_confirmation"
                    placeholder="Enter your password confirmation"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="current-focus"
                  />

                  {
                    <span
                      className="d-flex align-content-end input-group-text bg-light border-0"
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 5,
                        top: 5,
                      }}
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {showPasswordConfirm ? (
                        <IoMdEyeOff size={20} />
                      ) : (
                        <IoEye size={20} />
                      )}
                    </span>
                  }
                </div>

                {errors.confirmPassword && (
                  <small className="text-danger fw-bold"  style={{ fontSize: "12px"}}>
                    {" "}
                    {errors.confirmPassword}{" "}
                  </small>
                )}
              </div>

              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-sm"
                  onClick={handleSubmit}
                >
                  Enregistrer
                </button>

              </div>
            <div className="row">
               <div className="col d-flex justify-content-center align-items-center mt-3">
                   <p>
                       <NavLink
                           to="/"
                           className="text-decoration-none text-primary"
                           style={{fontSize: "16px"}}
                       >
                          Do you have an account ?
                       </NavLink>
                   </p>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Fragment, useEffect, useState } from "react";
import { FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import Input from "../inputs/text/Input.jsx";

import { MdEmail } from "react-icons/md";
import Select from "../inputs/select/Select.jsx";
import { useJourHook } from "../../hooks/useJourHook.jsx";
import { useMoisHook } from "../../hooks/useMoisHook.jsx";
import { useAnneeHook } from "../../hooks/useAnneeHook.jsx";
import useGenreHook from "../../hooks/useGenreHook.jsx";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { RiQuestionMark } from "react-icons/ri";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [selectedJour, setSelectedJour] = useState(-1);
  const [selectedMois, setSelectedMois] = useState(-1);
  const [selectedAnnee, setSelectedAnnee] = useState(-1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const { jours } = useJourHook();
  const { mois } = useMoisHook();
  const { annees } = useAnneeHook();
  const { genres } = useGenreHook();

  useEffect(() => {
    // Attention : les mois commencent à 0 en JS (0 = janvier, 1 = février)
    if (selectedJour && selectedMois && selectedAnnee) {
      const newDate = new Date(
        selectedAnnee,
        selectedMois - 1,
        selectedJour
      ).toLocaleDateString("fr-FR");
      setBirthDay(newDate);
    }
  }, [selectedJour, selectedMois, selectedAnnee]);

  useEffect(() => {
    console.log("birthday : ", birthDay);
  }, [birthDay]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-md-5 d-flex justify-content-start align-items-center text-white">
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

        <div className="col-md-7 d-flex justify-content-end align-items-center border-left">
          <div
            className="shadow-lg p-3 rounded-4"
            style={{ width: "700px", backgroundColor: "#ffffff" }}
          >
            <h4 className="text-start mb-5"> Create an account</h4>
            <form>
              <div className="row">
                <div className="col mb-3">
                  <label
                    htmlFor="firstname"
                    className="form-label d-flex align-items-center   "
                  >
                    <span className="input-group-text bg-light border-0">
                      <FaUser />
                    </span>
                    Firstname
                  </label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control rounded shadow-lg border border-secondary p-2"
                      id="username"
                      placeholder="Enter your firstname"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col mb-3">
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
                      className="form-control rounded shadow-lg border border-secondary p-2"
                      id="username"
                      placeholder="Enter your lastname"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col mb-3">
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
                      className="form-control rounded shadow-lg border border-secondary p-2"
                      id="address_mail"
                      placeholder="Enter your mail address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col mb-3">
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
                      className="form-control rounded shadow-lg border border-secondary p-2"
                      id="phone"
                      placeholder="Enter your phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
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
                <div className="col mb-3">
                  <div className="input-group">
                    <Select
                      options={jours}
                      className="form-select rounded shadow-lg border border-secondary p-2"
                      onChange={(e) => setSelectedJour(e.target.value)}
                      placeholder="jour"
                    />
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="input-group">
                    <Select
                      options={mois}
                      className="form-select rounded shadow-lg border border-secondary p-2"
                      onChange={(e) => setSelectedMois(e.target.value)}
                      placeholder="mois"
                    />
                  </div>
                </div>
                <div className="col mb-3">
                  <div className="input-group">
                    <Select
                      options={annees}
                      className="form-select rounded shadow-lg border border-secondary p-2"
                      onChange={(e) => setSelectedAnnee(e.target.value)}
                      placeholder="annee"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col mb-3">
                  <div className="input-group">
                    <Select
                      options={genres}
                      className="form-select rounded shadow-lg border border-secondary p-2"
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      placeholder="Genre"
                    />
                  </div>
                </div>
              </div>

              <div className="col mb-3">
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
                    className="form-control rounded shadow-lg border border-secondary p-2"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
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
                </div>
              </div>

              <div className="col mb-3">
                <label
                  htmlFor="password"
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
                    className="form-control rounded shadow-lg border border-secondary p-2"
                    id="password_confirmation"
                    placeholder="Enter your password confirmation"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg ">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { FaKey } from "react-icons/fa";

import Input from "@components/inputs/text/Input.jsx";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";

export default function Validation() {
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleValidation = async (e) => {
        e.preventDefault();
        setErrors("");
        setSuccess("");

        if (!code.trim()) {
            setErrors("Le code de validation est obligatoire");
            return;
        }

        if(!/^\d{6}$/.test(code.trim())){
            setErrors("Le code doit contenir 6 chiffres.");
            return;
        }

        if(code.length !== 6){
            setErrors("Le code doit contenir 6 chiffres.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/utilisateurs/enableAccount", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                const err = await response.json();
                console.log(err.message);
                throw new Error(err.message);
            }

            setSuccess("Votre compte a été validé avec succès.");
            navigate("/", { replace: true });
        } catch (err) {
            setErrors(err.message);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
                    <div
                        className="shadow-lg p-4 rounded-4"
                        style={{ width: "550px", backgroundColor: "#ffffff" }}
                    >
                        <h5 className="text-start mb-4 fw-bold">Validez votre compte</h5>

                        <p className="text-muted small">
                            Un code vous a été envoyé par email. Entrez-le ci-dessous pour activer votre compte.
                        </p>

                        <form onSubmit={handleValidation}>
                            <label className="form-label d-flex align-items-center">
                            <span className="input-group-text bg-light border-0">
                              <FaKey />

                            </span>
                                Code de validation
                            </label>

                            <Input
                                type="text"
                                value={code}
                                className={`form-control rounded shadow-lg border border-secondary p-2 ${
                                    errors ? "is-invalid" : ""
                                }`}
                                placeholder="Ex : 205412"
                                onChange={(e) => setCode(e.target.value)}
                            />

                            {errors && (
                                <small className="text-danger fw-bold mt-1 d-block">
                                    {errors}
                                </small>
                            )}

                            {success && (
                                <small className="text-success fw-bold mt-1 d-block">
                                    {success}
                                </small>
                            )}

                            <div className="d-grid mt-4">
                                <button type="submit" className="btn btn-primary btn-lg btn-sm">
                                    Envoyer le code de validation
                                </button>
                            </div>
                            <div className="row">
                                <div className="col d-flex justify-content-center align-items-center mt-3">
                                    <p>
                                        <NavLink
                                            to="/forgot-password"
                                            className="text-decoration-none text-primary"
                                            style={{fontSize: "16px"}}
                                        >
                                            Renvoyez un nouveau code de validation
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                </form>
            </div>
        </div>
    );
}

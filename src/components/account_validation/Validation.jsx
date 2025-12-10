import { useState } from "react";
import { FaKey } from "react-icons/fa";

import Input from "@components/inputs/text/Input.jsx";
import {useNavigate} from "react-router-dom";

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
                throw new Error(err.message || "Échec de la validation");
            }

            setSuccess("Votre compte a été validé avec succès.");
            navigate("/", { replace: true });
        } catch (err) {
            setErrors(err.message);
        }
    };

    const handleResend = async () => {
        try {
            await fetch("http://localhost:8080/api/v1/utilisateurs/resendCode", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            setSuccess("Un nouveau code vous a été envoyé.");
        } catch (err) {
            setErrors("Impossible de renvoyer le code.");
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <div
                className="shadow-lg p-4 rounded-4"
                style={{ width: "450px", backgroundColor: "#ffffff" }}
            >
                <h4 className="text-start mb-4">Validez votre compte</h4>

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
                            Valider mon compte
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none"
                            onClick={handleResend}
                        >
                            Renvoyer un nouveau code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

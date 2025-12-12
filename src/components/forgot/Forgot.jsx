import {useEffect, useState} from "react";

import Input from "@components/inputs/text/Input.jsx";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {MdEmail} from "react-icons/md";

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 15000);
        }
    }, [error]);

    const handelSendCode = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!email.trim()){
            setError("Veuillez entrer votre adresse mail.");
            return;
        }

        if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            setError("Veuillez entrer une adresse mail valide.");
            return;
        }

        try {
            const payload = { email };
            const response = await fetch("http://localhost:8080/api/v1/utilisateurs/resendCode", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if(!response.ok){
                const errors = await response.json();
               console.log(errors.message || "Erreur de serveur");
               throw new Error(errors.message || "Erreur de serveur");
            }

            setSuccess("Un nouveau code vous a été envoyé.");

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 15000)
        } catch (err) {
            console.log('erreur from serveur : ', err.message)
            setError(err.message);
        }
    };

    return (
       <>
           <div
               className="container d-flex justify-content-center align-items-center fixed-bottom"
               style={{ height: "100vh" }}>
               <div
                   className="shadow-lg p-4 rounded-4"
                   style={{ width: "550px", backgroundColor: "#ffffff" }}>
                   <h5 className="text-start mb-4 fw-bold">Envoyez un nouveau code</h5>

                   <p className="text-muted small">
                       Un code de 6 chiffres vous sera envoyé par email. Vous aurez besoin pour activer votre compte.
                   </p>

                   <form onSubmit={handelSendCode}>
                       <label className="form-label d-flex align-items-center">
                        <span className="input-group-text bg-light border-0">
                          <MdEmail />
                        </span>
                           Mail address
                       </label>

                       <Input
                           type="text"
                           value={email}
                           className={`form-control rounded shadow-lg border border-secondary p-2 ${
                               error ? "is-invalid" : ""
                           }`}
                           placeholder="Ex : alphadiobiya@gmail.com"
                           onChange={(e) => setEmail(e.target.value)}
                       />

                       {error && (
                           <small className="text-danger fw-bold mt-1 d-block">
                               {error}
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
                                       to="/account-validation"
                                       className="text-decoration-none text-primary"
                                       style={{fontSize: "16px"}}
                                   >
                                       Aller à la page de validation du compte
                                   </NavLink>
                               </p>
                           </div>
                       </div>

                   </form>
               </div>
           </div>
       </>
    );
}
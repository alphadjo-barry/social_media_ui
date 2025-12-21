import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const [error, setError] = useState("");
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null)
    const navigation = useNavigate();

    useEffect(() => {
        if(!picture){
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(picture);
        setPreview(objectUrl);
    }, [picture])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!picture){
            setError("Veuillez ajouter une photo de profil.");
            return;
        }
        const payload = new FormData();
        payload.append("file", picture);

        try{
            const response = await fetch("http://localhost:8080/api/v1/utilisateurs/profile-picture", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body:payload
            });

            if(!response.ok){
                const err = await response.json();
                console.log(err.message);
                throw new Error(err.message);
            }
            navigation("/dashboard", { replace: true });
        }
        catch(err){
            setError(err.message);
        }

    }

    return (
        <>
            <div
                className="container d-flex justify-content-end align-items-center"
                style={{ paddingTop: "100px"}}
            >
                <div
                    className="shadow-lg p-4 rounded-4 bg-white"
                    style={{ width: "600px", minHeight: "350px" }}
                >

                    <form onSubmit={handleSubmit}>

                        {/* Photos */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Photo de profil</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control shadow-sm"
                                onChange={(e) => setPicture(e.target.files[0])}
                            />
                        </div>

                        {/* Preview images */}

                        { picture &&
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                            <img
                                                src={ preview }
                                                alt="preview"
                                                style={{
                                                    width: "230px",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                }}
                                            />
                            </div>
                        }

                        {/* Erreurs */}
                        {error && (
                            <p className="text-danger fw-bold" style={{ fontSize: "13px" }}>
                                {error}
                            </p>
                        )}

                        {/* Btn Publier */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-sm">
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile;
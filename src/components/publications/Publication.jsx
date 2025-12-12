import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Publication = () => {
    const [legende, setLegende] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const navigation = useNavigate();

    const handleImages = (e) => {
        setImages((prev) => [...prev, ...e.target.files]);
    };

    const handlePublish = async (e) => {
        e.preventDefault();

        if (!legende.trim() && images.length === 0) {
            return setError("Veuillez ajouter une legende et une photo au moins.");
        }

        const payload = new FormData();
        payload.append("legende", legende);

        images.forEach((img) => {
            payload.append("files", img);
        });

        try {
            const response = await fetch("http://localhost:8080/api/v1/publications", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                method: "POST",
                body: payload,
            });

            if (!response.ok) {

                console.log('erreur from serveur ',response);
                throw new Error(response);
            }

            alert("Publication réussie !");
            setLegende("");
            setImages([]);
            setError("");
            navigation("/dashboard", { replace: true });
        } catch (err) {
            setError(err.message);
            console.log('erreur from serveur : ', err.message)
        }
    };

    return (
        <div
            className="container d-flex justify-content-end align-items-center"
            style={{ paddingTop: "100px"}}
        >
            <div
                className="shadow-lg p-4 rounded-4 bg-white"
                style={{ width: "600px", minHeight: "350px" }}
            >
                <h3 className="text-primary fw-bold mb-3">Créer une publication</h3>

                <form onSubmit={handlePublish}>
                    {/* Légende */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Légende</label>
                        <textarea
                            className="form-control shadow-sm"
                            rows="3"
                            placeholder="Exprime-toi..."
                            value={legende}
                            onChange={(e) => setLegende(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Photos */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Photos</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="form-control shadow-sm"
                            onChange={handleImages}
                        />
                    </div>

                    {/* Preview images */}
                    {images.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {Array.from(images).map((img, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Erreurs */}
                    {error && (
                        <p className="text-danger fw-bold" style={{ fontSize: "13px" }}>
                            {error}
                        </p>
                    )}

                    {/* Btn Publier */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Publier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Publication;

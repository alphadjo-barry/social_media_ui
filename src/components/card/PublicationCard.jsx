import React, {useEffect, useRef, useState} from "react";
import {IoSendSharp} from "react-icons/io5";
import {useTimeAgo} from "@hooks/useTimeAgo.jsx";

import {FaShareFromSquare} from "react-icons/fa6";
import Cookies from "js-cookie";

function PublicationCard({ publication }) {

    const adoreRef  = useRef(null);
    const rireRef = useRef(null);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
       try {
           const response = await fetch(`http://localhost:8080/api/v1/commentaires/publication/${publication.id}`, {
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${Cookies.get("token")}`,
               }
           });

           if(!response.ok){
               const errors = response.json();
               console.log('fetch commentaires : ',errors);
               throw new Error('erreur form back int fetch commentaires');
           }

          const data = await response.json();
           console.log('data : ', data)

           setComments(data)
       }
       catch (error) {
           console.error('fetch commentaires : ',error);
       }
    }

    const handleComment = async () => {
        const payload = {
            contenu: newComment,
            publicationId: publication?.id
        };

        setShowComments(false);

        console.log("Payload envoyé :", payload);

        try {
            const response = await fetch("http://localhost:8080/api/v1/commentaires", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errors = await response.json();
                console.log("Erreur backend :", errors);
                return;
            }

            console.log("Commentaire ajouté avec succès");
        } catch (err) {
            console.error("Erreur fetch :", err);
        }
    };

    const { legende, auteur, pictures, reactions, commentaires } = publication;

    // Gestion des photos
    const maxVisible = 3;
    const visiblePictures = pictures?.slice(0, maxVisible) || [];
    const hiddenPicturesCount = pictures?.length > maxVisible ? pictures.length - maxVisible : 0;

    const handleMouseEnter = () => {
        adoreRef.current.style.display = "inline";
        rireRef.current.style.display = "inline";
    };

    const handleMouseLeave = () => {
        adoreRef.current.style.display = "none";
        rireRef.current.style.display = "none";
    };

    const handleShow = ()=>{
        setShowComments(!showComments)
        fetchComments().then(r => r);
    }

    return (
        <div className="card shadow-lg mb-2">

            <div className="card-header d-flex align-items-center">

                {/* PHOTO */}
                <img
                    src={auteur.picturePath || "/default-user.png"}
                    alt="user"
                    className="rounded-circle shadow-lg"
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                />

                {/* Nom + TimeAgo en colonne */}
                <div className="ms-2 d-flex flex-column">
                    <h6 className="mb-0" style={{ fontSize: "14px" }}>
                        {auteur.firstName.charAt(0).toUpperCase()+''+auteur.firstName.substring(1).toLowerCase()} {auteur.lastName}
                    </h6>

                    <small className="text-muted" style={{ fontSize: "12px" }}>
                        {useTimeAgo(publication.createdAt)}
                    </small>
                </div>

            </div>

            {/* Légende */}
            <div className="card-body">
                <p>{legende}</p>

                {/* PHOTOS */}
                {visiblePictures.length > 0 && (
                    <div className="d-flex gap-2 flex-wrap">
                        {visiblePictures.map((pic, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={pic.picturePath}
                                    alt="publication"
                                    style={{
                                        width: "220px",
                                        height: "350px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />

                                {/* Badge +X si plus de 3 images */}
                                {index === 2 && hiddenPicturesCount > 0 && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            bottom: 0,
                                            width: "220px",
                                            height: "350px",
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            color: "white",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "22px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        +{hiddenPicturesCount}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {showComments && (
                    <div className="mt-3 p-1">

                        {comments.map((com, index) => (
                            <div
                                key={index}
                                className="d-flex mb-2 justify-content-start' "
                            >
                                <div
                                    className="shadow-lg p-2"
                                    style={{
                                        borderRadius: "10px",
                                        width: "100%",
                                        backgroundColor: "#f1f0f0"
                                    }}
                                >
                                    <div className="row">
                                        {/* Image à gauche */}
                                       <div className="col-1">
                                           <img
                                               src={com.auteur.picturePath}
                                               alt="user"
                                               className="rounded-circle shadow-lg"
                                               style={{ width: 40, height: 40, objectFit: "cover" }}
                                           />
                                       </div>

                                        {/* Contenu du commentaire à droite */}
                                        <div className="col-9 d-flex flex-column ms-2">
                                            <strong style={{ fontSize: "13px" }}>
                                                {com.auteur.firstName + " " + com.auteur.lastName}
                                            </strong>
                                            <p style={{ fontSize: "13px", margin: "5px 0" }}>{com.contenu}</p>
                                            <small style={{ fontSize: "10px", color: "#555", fontWeight: "bold" }}>
                                                { useTimeAgo(com.createdAt)}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        <div className="mt-3 d-flex gap-2 align-items-center">
                        <textarea
                            className="form-control shadow-sm"
                            rows="3"
                            placeholder="Commentez..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>

                            <button
                                className="btn btn-secondary btn-sm d-flex align-items-center justify-content-center"
                                style={{ height: "85px", width: "45px"}}
                                onClick={ handleComment }
                                disabled={ newComment === ""}
                            >
                                <IoSendSharp size={20} />
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* REACTIONS */}
            <div
                className="mt-3 d-flex flex-row gap-1 card-footer bg-transparent border-secondary"
                onMouseLeave={handleMouseLeave}
                style={{ height: "60px"}}
            >
                <div className="col">

                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row gap-2">
                            <small style={{ display: "none" }} ref={adoreRef}>
                                ❤️
                            </small>

                            <small style={{ display: "none" }} ref={rireRef}>  😂 </small>
                        </div>

                        <small onMouseEnter={handleMouseEnter}>{ reactions } 👍 </small>
                    </div>
                </div>

                <div className="col" onClick={ handleShow }
                     style={{ cursor: "pointer" }}>
                    {commentaires} commentaires 💬
                </div>

                <div className="col d-flex justify-content-end">
                    <span> 0 partager <FaShareFromSquare /></span>
                </div>
            </div>

        </div>
    );
}

export default PublicationCard;

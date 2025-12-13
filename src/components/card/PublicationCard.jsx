import React, { useRef, useState} from "react";
import {IoSendSharp} from "react-icons/io5";
import {useTimeAgo} from "@hooks/useTimeAgo.jsx";
import {useCommentaire} from "@hooks/useCommentaire.jsx";
import {FaShareFromSquare} from "react-icons/fa6";

function PublicationCard({ publication }) {

    const adoreRef  = useRef(null);
    const rireRef = useRef(null);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { coms } = useCommentaire();
    const [comments, setComments] = useState([...coms]);

    const handleComment = ()=>{
        setComments(prev => [...prev, {id: 16, auteur: "Alphadjo Barry", texte: newComment, heure: "Il y a 2 min"}]);
    }

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

                        {/* Liste des commentaires */}
                        {comments.map((com, index) => (
                            <div key={index} className="mb-2 d-flex flex-column shadow-lg p-2" style={{ borderRadius: "10px", height: "75px"}}>
                                <strong style={{ fontSize: "13px"}}>{com.auteur}</strong>
                                <span style={{ fontSize: "13px" }}>{com.texte}</span>
                                <small style={{ fontSize: "10px"}}>{ com.heure }</small>
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

                <div className="col" onClick={() => setShowComments(!showComments)}
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

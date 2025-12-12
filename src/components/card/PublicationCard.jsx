import React, {useEffect, useRef, useState} from "react";
import {IoSendSharp} from "react-icons/io5";

function PublicationCard({ publication }) {

    const adoreRef  = useRef(null);
    const rireRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");


    useEffect(() => {
        const coms = [
            { id: 1, auteur: "Alice Dupont", texte: "Super publication !", heure: "Il y a 2 min" },
            { id: 2, auteur: "Marc Gilbert", texte: "Je suis totalement d'accord 👍", heure: "Il y a 5 min" },
            { id: 3, auteur: "Sophie Martin", texte: "Merci pour le partage !", heure: "Il y a 12 min" },
            { id: 4, auteur: "Karim B.", texte: "Intéressant, j’aimerais en savoir plus.", heure: "Il y a 20 min" },
            { id: 5, auteur: "Julie Fontaine", texte: "Excellent contenu 🔥", heure: "Il y a 32 min" },
            { id: 6, auteur: "Nina Leclerc", texte: "Wow, très inspirant 🙏", heure: "Il y a 45 min" },
            { id: 7, auteur: "Olivier Mendes", texte: "Pas mal du tout !", heure: "Il y a 1 h" },
            { id: 8, auteur: "Céline Arnaud", texte: "Merci pour l’info 😊", heure: "Il y a 1 h" },
            { id: 9, auteur: "Pierre Lemaire", texte: "Bonne réflexion", heure: "Il y a 1 h 20" },
            { id: 10, auteur: "Hugo Trentin", texte: "Très utile, merci !", heure: "Il y a 1 h 35" },
            { id: 11, auteur: "Laura C.", texte: "Je partage 😉", heure: "Il y a 2 h" },
            { id: 12, auteur: "Tom Barre", texte: "J’adore ! ❤️", heure: "Il y a 2 h 15" },
            { id: 13, auteur: "Samira K.", texte: "Bonne explication 👌", heure: "Il y a 3 h" },
            { id: 14, auteur: "Chris Dubois", texte: "Je m’en souvenais plus, merci", heure: "Il y a 3 h 20" },
            { id: 15, auteur: "Léna Morin", texte: "Très clair !", heure: "Il y a 4 h" }
        ];

        setComments(prev => [...prev, ...coms]);
    }, [])


    const handleComment = ()=>{
        setComments(prev => [...prev, {id: 16, auteur: "Alphadjo Barry", texte: newComment, heure: "Il y a 2 min"}]);
    }

    function fromLocalDateTimeArray(arr) {
        const [year, month, day, hour, minute, second, nano] = arr;

        return new Date(
            year,
            month - 1,   // correction JS
            day,
            hour,
            minute,
            second,
            nano / 1_000_000 // convertir nanosecondes en millisecondes
        );
    }

    function timeAgo(dateToString){

        const now = new Date();
        const past = new Date(fromLocalDateTimeArray(dateToString));

        const diffInMilliSecondes = now - past;
        const diffInSec = Math.floor(diffInMilliSecondes / 1000);
        const diffInMin = Math.floor(diffInSec / 60);
        const diffInHour = Math.floor(diffInMin / 60);
        const diffInDay = Math.floor( diffInHour / 24);

        if (diffInMilliSecondes < 60) return "Il y a quelques secondes";
        if (diffInMin < 60) return `Il y a ${diffInMin} minute${diffInMin > 1 ? "s" : ""}`;
        if (diffInHour < 24) return `Il y a ${diffInHour} heure${diffInHour > 1 ? "s" : ""}`;
        if (diffInDay < 7) return `Il y a ${diffInDay} jour${diffInDay > 1 ? "s" : ""}`;

        // Au-delà de 7 jours : format JJ/MM/AAAA
        return past.toLocaleDateString("fr-FR");
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
                    style={{ width: 60, height: 60, borderRadius: "20px%", objectFit: "cover" }}
                />

                {/* Nom + TimeAgo en colonne */}
                <div className="ms-2 d-flex flex-column">
                    <h6 className="mb-0" style={{ fontSize: "14px" }}>
                        {auteur.firstName.charAt(0).toUpperCase()+''+auteur.firstName.substring(1).toLowerCase()} {auteur.lastName}
                    </h6>

                    <small className="text-muted" style={{ fontSize: "12px" }}>
                        {timeAgo(publication.createdAt)}
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
                                        width: "200px",
                                        height: "250px",
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
                                            width: "200px",
                                            height: "250px",
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

                {/* REACTIONS */}
                <div
                    className="mt-3 d-flex flex-row gap-1"
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="col">

                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row gap-2">
                                <small style={{ display: "none" }} ref={adoreRef}>
                                    ❤️
                                </small>

                                <small style={{ display: "none" }} ref={rireRef}>  😂 </small>
                            </div>

                            <small onMouseEnter={handleMouseEnter}>👍  { reactions }</small>
                        </div>
                    </div>

                    <div className="col" onClick={() => setShowComments(!showComments)}
                         style={{ cursor: "pointer" }}>
                        💬 Commentaires ({commentaires})
                    </div>

                    <div className="col">

                    </div>
                </div>

                {showComments && (
                    <div className="mt-3 p-1 bg-light">

                        {/* Liste des commentaires */}
                        {comments.map((com, index) => (
                            <div key={index} className="mb-2 d-flex flex-column alert alert-secondary" style={{ borderRadius: "20px"}}>
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
                                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
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
        </div>
    );
}

export default PublicationCard;

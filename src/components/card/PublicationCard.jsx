import React, {useEffect, useRef, useState} from "react";
import {useTimeAgo} from "@hooks/useTimeAgo.jsx";

import Cookies from "js-cookie";

import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import CommentaireItem from "@components/commentaires/CommentaireItem.jsx";
import NewComment from "@components/commentaires/NewComment.jsx";
import Picture from "@components/publications/Picture.jsx";
import Reaction from "@components/reactions/Reaction.jsx";

function PublicationCard({ publication }) {

    const adoreRef  = useRef(null);
    const rireRef = useRef(null);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedPictureUrl, setSelectedPictureUrl] = useState("");

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(
                    `/topic/publications/${publication.id}/commentaires`,
                    (message) => {
                       const commentaire = JSON.parse(message.body);
                       const [partOne, partTwo] = commentaire.createdAt.split("T");
                       console.log(partOne, partTwo);
                       const [year, month, day] = partOne.split("-");
                       const [hour, minute, secondNanoSeconds] = partTwo.split(":");
                       const [second, nanoSeconds] = secondNanoSeconds.split(".");
                        commentaire.createdAt = [parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute), parseInt(second), parseInt(nanoSeconds)];
                       setComments(prev => [...prev, commentaire]);
                       console.log(' commentaire added : ', commentaire.createdAt);
                    }
                );
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [publication.id]);

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
               //const errors = response.json();
               throw new Error('erreur form back int fetch commentaires');
           }

          const data = await response.json();
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

        if(!newComment.trim()){
            return;
        }

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

            setNewComment("");
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

    const handleShow = async () => {
        if (!showComments) {
            await fetchComments();
        }
        setShowComments(prev => !prev);
    };


    const parseDate = (date) => {
        if (Array.isArray(date)) {
            const [y, m, d, h, min, s] = date;
            return new Date(y, m - 1, d, h, min, s);
        }
        return new Date(date);
    };

    const sortedComments = [...comments].sort(
        (a, b) => parseDate(a.createdAt) - parseDate(b.createdAt)
    );

    const handleSelectedPicture = (path)=>{
        if(path){
             setSelectedPictureUrl(path);
         }
         return () => setSelectedPictureUrl("");
    }

    return (
        <>
            <div className="card shadow-lg mb-2">
                <div className="card-header d-flex align-items-center">

                    {/* PHOTO */}
                    <img
                        src={auteur.picturePath || "/default-user.png"}
                        alt="user"
                        className="rounded-circle shadow-lg"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                    />

                    {/* Nom + TimeAgo en colonne */}
                    <div className="ms-2 d-flex flex-column">
                        <h6 className="mb-0" style={{ fontSize: "14px" }}>
                            {auteur.firstName.charAt(0).toUpperCase()+''+auteur.firstName.substring(1).toLowerCase()} {auteur.lastName}
                        </h6>

                        <small className="text-muted" style={{ fontSize: "12px" }}>
                            { useTimeAgo(publication.createdAt) }
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
                             <Picture key={index} pic={pic} hiddenPicturesCount={hiddenPicturesCount} handleSelectedPicture={handleSelectedPicture} selectedPictureUrl={selectedPictureUrl}/>
                            ))}
                        </div>
                    )}

                    {showComments && (
                        <div className="mt-3 p-1">

                            {sortedComments.map((com, index) => (
                                <CommentaireItem key={index} com={com} />
                            ))}

                             <NewComment newComment={newComment} setNewComment={setNewComment} handleComment={handleComment}/>
                        </div>
                    )}

                </div>

                {/* REACTIONS */}
                <Reaction
                    handleShow={handleShow}
                    reactions={reactions}
                    sortedComments={sortedComments}
                    commentaires={commentaires}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    adoreRef={adoreRef}
                    rireRef={rireRef}
                    publicationId={publication.id}
                />
            </div>
        </>
    );
}

export default PublicationCard;

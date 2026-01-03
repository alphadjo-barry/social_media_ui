import { FaShareFromSquare } from "react-icons/fa6";
import "./Reaction.css";
import {useContext, useState} from "react";
import { UserInfoContexte } from "@providers/UserInfoContexte.jsx";

import Cookies from "js-cookie";
import ReactionWebSocket from "@components/webSocket/ReactionWebSocket.jsx";

export default function Reaction({ handleShow, reactions, sortedComments, commentaires, publicationId }) {

    const { user } = useContext(UserInfoContexte);
    const [likes, setLikes] = useState(reactions);

    ReactionWebSocket(publicationId, setLikes);

    const handleLike = async (publicationId) => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/reactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify({ publicationId, utilisateurId: user.userId }),
            });

            if(!response.ok) { return -1; }

        } catch (err) {
            console.error("Erreur like :", err);
        }
    };

    return (
        <div className="mt-3 d-flex flex-row gap-1 card-footer bg-transparent border-secondary" style={{ height: "60px" }}>
            {/* Bouton like */}
            <div className="col">
                <button className="btn btn-default btn-reaction" onClick={() => handleLike(publicationId)}>
                    {likes} 👍 J'aime
                </button>
            </div>

            {/* Commentaires */}
            <div className="col" onClick={handleShow} style={{ cursor: "pointer" }}>
                {sortedComments.length > 0 ? sortedComments.length : commentaires} commentaires 💬
            </div>

            {/* Partage */}
            <div className="col d-flex justify-content-end">
                <span>0 partager <FaShareFromSquare /></span>
            </div>
        </div>
    );
}

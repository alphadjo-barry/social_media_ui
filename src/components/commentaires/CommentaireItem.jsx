import {useTimeAgo} from "@hooks/useTimeAgo.jsx";
import React from "react"
import "./CommentaireItem.css"

export default function CommentaireItem({ com, index }) {
    return(<>
        <div
            key={index}
            className="d-flex mb-2 justify-content-start' "
        >
            <div
                className="shadow-lg p-2 commentaire-Item"
                style={{
                    borderRadius: "10px",
                    width: "100%",
                    backgroundColor: "#f8f9fa"
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
                            {com.auteur.firstName.slice(0,1).toUpperCase() +com.auteur.firstName.slice(1).toLowerCase()+" "+ com.auteur.lastName}
                        </strong>
                        <p style={{ fontSize: "13px", margin: "5px 0" }}>{com.contenu}</p>
                        <small style={{ fontSize: "11px", color: "#555" }}>
                            { useTimeAgo(com.createdAt) }
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
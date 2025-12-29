
import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";
import "./Sent.css"

import useWebSocketService from "@components/webSocket/useWebSocketService.jsx";

export default function Sent() {
    const { user } = useContext(UserInfoContexte)
    const [requests, setRequests] = useState([]);

    const { requestSend }= useWebSocketService(user.userId);

    useEffect(() => {
        if (!requestSend) return;

        setRequests(prev => {
            const index = prev.findIndex(r => r.id === requestSend.id);

            if (index > -1) {
                return prev.map(r =>
                    r.id === requestSend.id ? requestSend : r
                );
            } else {
                return [...prev, requestSend];
            }
        });

    }, [requestSend]);


    const fetchRequests = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/conversations/sent`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if(!response.ok){
                const errors = await response.json();
                console.log('Erreur from API : ', errors)
                throw new Error("Erreur API");
            }
            const data = await response.json();
            setRequests(data)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequests().then(r => r);
    }, [])

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h3 className="mb-4 text-center text-primary">Invitations envoyées</h3>

                    {requests.length > 0 ? (
                        <div className="d-flex flex-column gap-3">
                            {requests
                                .map((r, index) => (
                                <div
                                    key={`${index}`}
                                    className="card shadow-sm rounded-4 p-3 d-flex align-items-center flex-md-row flex-column justify-content-between"
                                    style={{ backgroundColor: "#f9f9f9" }}
                                >
                                    {/* Zone utilisateur */}
                                    <div className="d-flex align-items-center mb-3 mb-md-0 flex-grow-1">
                                        <img
                                            src={ r?.recepteur?.picturePath || "/imagess/default-cover.png"}
                                            alt="user"
                                            className="rounded-circle me-3"
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                            onError={(e) => { e.target.src = "/images/default-avatar.png"; }}
                                        />
                                        <div className="d-flex flex-column overflow-hidden">
                                            <span className="fw-bold text-truncate">{r?.recepteur?.firstName} {r?.recepteur?.lastName}</span>
                                            <small className="text-muted text-truncate">{r?.recepteur?.email}</small>
                                        </div>
                                    </div>

                                    {/* Zone boutons */}
                                    <div className="d-flex gap-2 flex-column flex-md-row mt-2 mt-md-0">
                                        <button
                                            className={`btn btn-sm rounded-pill shadow-sm ${
                                                r.status === "PENDING" ? "btn btn-danger" : "btn btn-success"
                                            }`}
                                            disabled={ r.status === "ACCEPTED"}
                                            style={{ width: "100px" }}
                                        >
                                            {r.status === "PENDING" ? "En attente" : "Amis"}
                                        </button>
                                        { r.status !== "ACCEPTED" && (<button className="btn btn-sm btn btn-warning rounded-pill shadow-sm"  style={{ width: "100px" }}>Annuler</button>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-warning text-center rounded-4">
                            Vous n'avez pas d'invitations en attente d'acceptation pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}
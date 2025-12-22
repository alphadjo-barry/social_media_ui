
import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";
import "./Sent.css"
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import InputSearch from "@components/searchs/InputSearch.jsx";

export default function Sent() {
    const { user } = useContext(UserInfoContexte)
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe("/user/queue/receive", (message) => {
                    const data = JSON.parse(message.body);
                    console.log('data from : ', data);
                    setRequests(prev => [...prev, data]);
                });
            },
        });

        client.activate();
        return () => {
            client.deactivate();
        };
    }, [])


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

    return(
        <>
           <div className="container mt-5">
               <div className="row">
                   <div className="col-md-2">

                   </div>
                   <div className="col-md-8">
                       <h5>Invitations envoyées</h5>
                        <div className="card shadow-lg">

                            <div className="card-body">

                                { requests.length !== 0 ? requests
                                    .map(r => (
                                        <div
                                            key={r.id}
                                            className="d-flex align-items-center justify-content-center p-2 mt-2 rounded-3 shadow-lg user-item"
                                            style={{ backgroundColor: "#fff" }}
                                        >
                                            {/* Zone gauche */}
                                            <div className="d-flex align-items-center flex-grow-1 min-width-0">
                                                <img
                                                    src={r.recepteur.picturePath}
                                                    alt="user"
                                                    className="rounded-circle me-2 flex-shrink-0"
                                                    style={{ width:50, height: 50, objectFit: "cover" }}
                                                    onError={(e) => {
                                                        e.target.src = "/images/default-avatar.png";
                                                    }}
                                                />

                                                <div className="d-flex flex-column overflow-hidden">
                                                      <span className="fw-semibold text-truncate">
                                                        {r.recepteur.firstName} {r.recepteur.lastName}
                                                      </span>
                                                    <small className="text-muted text-truncate">{r.recepteur.email}</small>
                                                </div>
                                            </div>

                                            {/* Zone bouton */}
                                            <div className="d-flex ms-2 flex-row gap-2">
                                                <button
                                                    className="btn btn-outline-primary btn-sm rounded-pill w-100 shadow-lg">
                                                    { r.status === "PENDING" ? "Attente" : "Accepter" }
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm rounded-pill w-100 shadow-lg"
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </div>
                                    )) : <div className="badge bg-danger">
                                            Vous n'avez pas d'invitation en attente d'acceptation pour le moment.
                                        </div>
                                }
                            </div>
                        </div>
                   </div>
                   <div className="Col-md-2">

                   </div>
               </div>
           </div>
        </>);
}
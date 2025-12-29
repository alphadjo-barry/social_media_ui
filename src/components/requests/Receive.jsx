import Cookies from "js-cookie";
import {useContext, useEffect, useState} from "react";
import useWebSocketService from "@components/webSocket/useWebSocketService.jsx";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";

export default function Receive(){

    const [requestReceives, setRequestReceives] = useState([]);
    const { user } = useContext(UserInfoContexte);

    const { requestReceive }= useWebSocketService(user.userId);

    useEffect(() => {
        if (!requestReceive) return;
        console.log('request receives 1 in jsx : ', requestReceives);
        setRequestReceives(prev => {
            const index = prev.findIndex(r => r.id === requestReceive.id);

            if (index > -1) {
                return prev.map(r =>
                    r.id === requestReceive.id ? requestReceive : r
                );
            } else {
                return [...prev, requestReceive];
            }
        });

        console.log('request receive 2 in jsx  : ', requestReceives);

    }, [requestReceive]);

    const fetchRequests = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/conversations/receive`, {
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
            console.log('data : ', data);
            setRequestReceives(data)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequests().then(r => r);
    }, [])

    const handleAccepted = async (r)=>{
        const payload = {
            envoyeurId: r.envoyeur.id,
            recepteurId: r.recepteur.id
        };
        console.log('payload : ',payload, ' id : ', r.id)

        const response = await fetch(`http://localhost:8080/api/v1/conversations/accepted/${r.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            const errors = await response.json();
            console.log('error : ', errors);
            throw new Error("Erreur API");
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h3 className="mb-4 text-center text-primary">Invitations reçues</h3>

                    {requestReceives.length > 0 ? (
                        requestReceives.map((r) => {
                            const envoyeur = r.envoyeur || {}; // fallback vide
                            return (
                                <div
                                    key={r.id}
                                    className="card shadow-sm rounded-4 p-3 d-flex align-items-center flex-md-row flex-column justify-content-between"
                                    style={{ backgroundColor: "#f9f9f9" }}
                                >
                                    {/* Zone utilisateur */}
                                    <div className="d-flex align-items-center mb-3 mb-md-0 flex-grow-1">
                                        <img
                                            src={envoyeur.picturePath || "/images/default-avatar.png"}
                                            alt="user"
                                            className="rounded-circle me-3"
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                            onError={(e) => { e.target.src = "/images/default-avatar.png"; }}
                                        />
                                        <div className="d-flex flex-column overflow-hidden">
                                            <span className="fw-bold text-truncate">{envoyeur.firstName || "Utilisateur"} {envoyeur.lastName || ""}</span>
                                            <small className="text-muted text-truncate">{envoyeur.email || ""}</small>
                                        </div>
                                    </div>

                                    {/* Zone boutons */}
                                    <div className="d-flex gap-2 flex-column flex-md-row mt-2 mt-md-0">
                                        {r.status === "PENDING" ? (
                                            <>
                                                <button className="btn btn-sm btn-outline-success rounded-pill shadow-sm"  onClick ={ () => handleAccepted(r) }>Accepter</button>
                                                <button className="btn btn-sm btn-outline-danger rounded-pill shadow-sm">Refuser</button>
                                            </>
                                        ) : (
                                            <button
                                                className={`btn btn-sm rounded-pill shadow-sm ${
                                                    r.status === "ACCEPTED" ? "btn-outline-success" : "btn-outline-secondary"
                                                }`}
                                                disabled
                                            >
                                                {r.status === "ACCEPTED" ? "ACCEPTED" : "REJECTED"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="alert alert-warning text-center rounded-4">
                            Vous n'avez aucune invitation en attente.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

}
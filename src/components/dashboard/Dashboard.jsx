import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import PublicationCard from "@components/card/PublicationCard.jsx";

import {useNavigate} from "react-router-dom";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";
import {conversationData} from "@components/data/ConversationData.jsx";
import ConversationList from "@components/data/ConversationList.jsx";

function Dashboard() {
    const [publications, setPublications] = useState([]);
    const navigate = useNavigate();
    const { user  } = useContext(UserInfoContexte)
    const { currentUser, conversations } = conversationData();
    const findAllPublications = async () => {
        try {
            const token = Cookies.get("token");

            const response = await fetch("http://localhost:8080/api/v1/publications", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok){
                const errors = await response.json();
                console.log('Erreur from API : ', errors)
                throw new Error("Erreur API");
            }

            const data = await response.json();
            setPublications(data);
            console.log(data)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        findAllPublications().then(r => r);
    }, []);

    const handleFocus = () => {
        navigate("/publication", { replace: true });
    }

    return (
        <>
            <div className="mt-4">
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-5 offset-md-1">
                        <>
                            {/* Bloc avant la publication */}
                            <div
                                className="card shadow-lg d-flex mt-2 mb-2 "
                                style={{ height: "60px", backgroundColor: "#f1f0f0" }}
                            >
                                <div className="row mt-2 ms-2 align-items-center">
                                    <div className="col-1">
                                        <img
                                            src={user.picturePath}
                                            alt="user"
                                            className="rounded-circle shadow-lg"
                                            style={{ width: 40, height: 40, objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            placeholder="Quoi de neuf ?"
                                            onFocus={ handleFocus }
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-3 d-flex justify-content-end">
                                        {/* Tu peux ajouter un bouton envoyer ici si tu veux */}
                                    </div>
                                </div>
                            </div>

                        </>

                        {publications.map(pub => (
                            <PublicationCard key={pub.id} publication={pub} />
                        ))}

                    </div>
                    <div className="col-md-3 card shadow-lg">
                            <ConversationList
                                conversations={conversations}
                                selectedId={currentUser.id}
                                onSelect={ ()=> { }}
                            />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

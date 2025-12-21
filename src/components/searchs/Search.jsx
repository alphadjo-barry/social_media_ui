import {LuUserRoundSearch} from "react-icons/lu";
import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";
import "./Search.css"

export default function Search() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserInfoContexte)

    const findAllUsers = async () => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/utilisateurs/search?q=${encodeURIComponent(search)}`, {
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
            console.log('users : ', data)
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if(search.trim() !== "") {
                findAllUsers().then(r => r);
            } else {
                setUsers([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);


    return(
        <>
            <div className="d-flex align-items-center position-relative">
                <LuUserRoundSearch className="position-absolute" style={{ left: "10px"}}/>
                <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Rechercher..."
                    style={{ paddingLeft: "30px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value) }
                />
            </div>

            {users
                .filter(u => u.id !== user.userId)
                .map(u => (
                    <div
                        key={u.id}
                        className="d-flex align-items-center p-2 mt-2 rounded-3 shadow-sm user-item"
                        style={{ backgroundColor: "#fff" }}
                    >
                        {/* Zone gauche */}
                        <div className="d-flex align-items-center flex-grow-1 min-width-0">
                            <img
                                src={u.picturePath}
                                alt="user"
                                className="rounded-circle me-2 flex-shrink-0"
                                style={{ width: 42, height: 42, objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.src = "/images/default-avatar.png";
                                }}
                            />

                            {/* Texte tronqué */}
                            <div className="d-flex flex-column overflow-hidden">
                                  <span className="fw-semibold text-truncate">
                                    {u.firstName} {u.lastName}
                                  </span>
                                <small className="text-muted text-truncate">{u.email}</small>
                            </div>
                        </div>

                        {/* Zone bouton */}
                        <div className="flex-shrink-0 ms-2" style={{ width: "110px" }}>
                            <button
                                className="btn btn-outline-primary btn-sm rounded-pill w-100"
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                ))}

        </>);
}
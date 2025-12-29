import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserInfoContexte } from "@providers/UserInfoContexte.jsx";
import "./Search.css";

import InputSearch from "@components/searchs/InputSearch.jsx";

import useWebSocketService from "@components/webSocket/useWebSocketService";

export default function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserInfoContexte);
  const [requests, setRequests] = useState([]);
  const [receiveRequests, setReceiveRequests] = useState([]);

  const { requestReceive, requestSend }= useWebSocketService(user.userId, requests, receiveRequests);

  useEffect(()=>{
    setReceiveRequests(prev => [...prev, requestReceive])
  }, [requestReceive]);

  useEffect(() => {
    setRequests(prev => [...prev, requestSend]);
  }, [requestSend])

  const findAllUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/utilisateurs/search?q=${encodeURIComponent(
          search
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errors = await response.json();
        console.log("Erreur from API : ", errors);
        throw new Error("Erreur API");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/conversations/sent`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errors = await response.json();
        console.log("Erreur from API : ", errors);
        throw new Error("Erreur API");
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests().then((r) => r);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() !== "") {
        findAllUsers().then((r) => r);
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleRequest = async (id) => {
    const payload = {
      envoyeurId: user.userId,
      recepteurId: id,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/conversations/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errors = await response.json();
        console.log("Erreur from API in request : ", errors);
        throw new Error("Erreur API");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <InputSearch search={search} setSearch={setSearch} />

      {requests
        .map((r) => (
          <div
            key={r.id}
            className="d-flex align-items-center p-2 mt-2 rounded-3 shadow-sm user-item"
            style={{ backgroundColor: "#fff" }}
          >
            {/* Zone gauche */}
            <div className="d-flex align-items-center flex-grow-1 min-width-0">
              <img
                src={r?.recepteur?.picturePath}
                alt="user"
                className="rounded-circle me-2 flex-shrink-0"
                style={{ width: 42, height: 42, objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                }}
              />

              <div className="d-flex flex-column overflow-hidden">
                <span className="fw-semibold text-truncate">
                  {r?.recepteur?.firstName} {r?.recepteur?.lastName}
                </span>
                <small className="text-muted text-truncate">{r?.recepteur?.email}</small>
              </div>
            </div>

            {/* Zone bouton */}
            <div className="flex-shrink-0 ms-2" style={{ width: "110px" }}>
              {r.status === "PENDING" && (
                  <button className="btn btn-sm btn-outline-danger rounded-pill disabled w-100">
                    En attente
                  </button>
              )}

              {r.status === "ACCEPTED" && (
                  <button className="btn btn-sm btn-success rounded-pill disabled w-100">
                    Amis
                  </button>
              )}
            </div>

          </div>
        ))}
    </>
  );
}

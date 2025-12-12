import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PublicationCard from "@components/card/PublicationCard.jsx";

function Dashboard() {
    const [publications, setPublications] = useState([]);

    const findAllPublications = async () => {
        try {
            const token = Cookies.get("token");

            const response = await fetch("http://localhost:8080/api/v1/publications", {
                method: "GET",
                headers: {
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

    return (
        <div className="container mt-4">

            {publications.map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
            ))}

        </div>
    );
}

export default Dashboard;

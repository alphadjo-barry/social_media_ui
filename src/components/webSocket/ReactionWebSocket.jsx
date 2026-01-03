import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function ReactionWebSocket(publicationId, setLikes) {
    useEffect(() => {
        if (!publicationId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("listining to the like socket ");
                client.subscribe(`/queue/like/${publicationId}`, (message) => {
                    const data = JSON.parse(message.body);
                    console.log("Nouveau like reçu via WS:", data);

                    setLikes(prev => prev + 1);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
            },
        });

        client.activate();

        return () => {
            if (client.active) {
                client.deactivate();
            }
        };
    }, [publicationId, setLikes]);
}
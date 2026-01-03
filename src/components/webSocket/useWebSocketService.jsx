import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useWebSocketService(
  userId
) {
  const [requestReceive, setRequestReceive] = useState({});
  const [requestSend, setRequestSend] = useState({});

  useEffect(() => {
    if (!userId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket connecté");

        client.subscribe(`/queue/receive/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          setRequestReceive(data);
        });

        client.subscribe(`/queue/send/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          setRequestSend(data);
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return { requestReceive, requestSend };
}

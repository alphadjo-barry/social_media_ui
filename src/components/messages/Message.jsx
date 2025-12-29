import { useEffect, useRef, useState } from "react";
import "./Message.css";

export default function Message({ currentUserId, contact, messages, onSend }) {
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    return (
        <div className="conversation-container shadow rounded-4">
            {/* HEADER */}
            <div className="conversation-header d-flex align-items-center gap-3 px-3 py-2">
                <img
                    src={contact.picturePath || "/images/default-avatar.png"}
                    alt="user"
                    className="avatar"
                />
                <div className="flex-grow-1">
                    <div className="fw-bold">{contact.firstName} {contact.lastName}</div>
                    <small className="text-success">En ligne</small>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="conversation-body px-3 py-3">
                {messages.map((msg) => {
                    const isMine = msg.senderId === currentUserId;

                    return (
                        <div
                            key={msg.id}
                            className={`message-row ${isMine ? "mine" : "theirs"}`}
                        >
                            <div className="message-bubble">
                                <p className="mb-1">{msg.content}</p>
                                <small className="message-time">
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </small>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="conversation-footer p-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Écrire un message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        className="btn btn-primary rounded-pill ms-2 px-4"
                        onClick={handleSend}
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}

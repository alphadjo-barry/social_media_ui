// ConversationList.jsx
import "./ConversationList.css";

export default function ConversationList({ conversations, selectedId, onSelect }) {
    return (
        <div className="conversation-list">
            <h5 className="px-3 pt-3 mb-3">Messages</h5>

            {conversations.map((c) => (
                <div
                    key={c.id}
                    className={`conversation-item ${selectedId === c.id ? "active" : ""}`}
                    onClick={() => onSelect(c)}
                >
                    <img src={c.user.picturePath} alt="avatar" />
                    <div className="conversation-info">
                        <div className="d-flex justify-content-between">
                            <strong>{c.user.firstName}</strong>
                            <small>{new Date(c.updatedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</small>
                        </div>
                        <small className="text-muted text-truncate">{c.lastMessage}</small>
                    </div>
                    {c.user.online && <span className="online-dot" />}
                </div>
            ))}
        </div>
    );
}

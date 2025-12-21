import { IoSendSharp } from "react-icons/io5";
import React from "react";

export default function NewComment({ newComment, setNewComment, handleComment }) {
    return (
        <div className="mt-3 d-flex flex-column gap-2">
      <textarea
          className="form-control shadow-sm"
          rows="3"
          placeholder="Commentez..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
      />

            {/* Bouton à droite */}
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                    onClick={handleComment}
                    disabled={newComment.trim() === ""}
                >
                    Commenter
                    <IoSendSharp size={14} />
                </button>
            </div>
        </div>
    );
}


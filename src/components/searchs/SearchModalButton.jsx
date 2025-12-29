import React from "react";
import Search from "./Search";

export default function SearchModalButton({ show, setShow }) {
    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Rechercher des amis / Demandes
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShow(false)}
                            />
                        </div>

                        {/* Body */}
                        <div
                            className="modal-body"
                            style={{ maxHeight: "70vh", overflowY: "auto" }}
                        >
                            <Search />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

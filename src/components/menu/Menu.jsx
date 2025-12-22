import React, { useContext, useEffect } from "react";
import { Dropdown, initMDB } from "mdb-ui-kit";

import "mdb-ui-kit/css/mdb.min.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserInfoContexte } from "@providers/UserInfoContexte.jsx";
import SearchModalButton from "@components/searchs/SearchModalButton.jsx";

export default function Menu() {
    const navigate = useNavigate();
    const { user } = useContext(UserInfoContexte);
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        initMDB({ Dropdown });
    }, []);

    const logout = () => {
        Cookies.remove("token");
        navigate("/", { replace: true });
    };

    const handleProfile = () => {
        navigate("/profile", { replace: true });
    };

    const handleSettings = () => {
        navigate("/settings", { replace: true });
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSent = () => {
        console.log('sent')
        navigate("/sent", { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
            <div className="container-fluid justify-content-between">

                {/* Logo + Search */}
                <div className="d-flex align-items-center gap-2">
                    <a
                        className="navbar-brand me-2 mb-1 d-flex align-items-center"
                        onClick={() => navigate("/dashboard", { replace: true })}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                            height="20"
                            alt="MDB Logo"
                            loading="lazy"
                            style={{ marginTop: "2px" }}
                        />
                    </a>

                    <form className="input-group w-auto my-auto d-none d-sm-flex">
                        <input
                            autoComplete="off"
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            style={{ minWidth: "125px" }}
                        />
                        <span className="input-group-text border-0 d-none d-lg-flex">
                            <i className="fas fa-search"></i>
                        </span>
                    </form>

                    <button className="btn btn-secondary btn-sm rounded-pill" onClick={handleShow}>
                        Rechercher des amis
                    </button>

                    <SearchModalButton show={show} setShow={setShow} />

                </div>

                {/* User & Notifications */}
                <ul className="navbar-nav flex-row align-items-center">

                    {/* Profil utilisateur */}
                    <li className="nav-item dropdown me-3 me-lg-1">
                        <a
                            data-mdb-dropdown-init
                            className="nav-link dropdown-toggle hidden-arrow"
                            href="#"
                            role="button"
                            aria-expanded="false"
                            aria-label="User menu"
                        >
                            <i className="fas fa-user fa-lg"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end gap-3 p-2">
                            <li className="d-flex align-items-center gap-2">
                                <img
                                    src={user.picturePath}
                                    alt="user"
                                    className="rounded-circle shadow-lg"
                                    style={{ width: 40, height: 40, objectFit: "cover", cursor: "pointer" }}
                                    onClick={handleProfile}
                                />
                                <div>
                                    <span className="badge bg-success">{user.fullName}</span>
                                    <br />
                                    <small className="text-muted">En ligne</small>
                                </div>
                            </li>
                            <li>
                                <span className="badge bg-primary" style={{ cursor: "pointer" }} onClick={handleSettings}>
                                    Paramètres
                                </span>
                            </li>
                            <li>
                                <span className="badge bg-danger" style={{ cursor: "pointer" }} onClick={logout}>
                                    Déconnexion
                                </span>
                            </li>
                        </ul>
                    </li>

                    {/* Notifications */}
                    <li className="nav-item dropdown me-3 me-lg-1">
                        <a
                            data-mdb-dropdown-init
                            className="nav-link dropdown-toggle hidden-arrow position-relative"
                            href="#"
                            role="button"
                            aria-expanded="false"
                            aria-label="Notifications"
                        >
                            <i className="fas fa-bell fa-lg"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: "250px" }}>
                            <li><strong className="dropdown-item-text">Notifications</strong></li>

                            <li><hr className="dropdown-divider" /></li>
                            <li><strong className="dropdown-item-text">Demandes d'amis</strong></li>
                            <li>
                                <span className="dropdown-item">
                                    Reçues <span className="badge bg-warning"></span>
                                </span>

                            </li>
                            <li>
                                <span className="dropdown-item">
                                    Envoyées <span className="badge bg-info" onClick={ handleSent }></span>
                                </span>

                            </li>
                            <li>
                                <span className="dropdown-item">
                                    Amis <span className="badge bg-success"></span>
                                </span>

                            </li>
                        </ul>
                    </li>

                    {/* Menu supplémentaire */}
                    <li className="nav-item dropdown me-3 me-lg-1">
                        <a
                            data-mdb-dropdown-init
                            className="nav-link dropdown-toggle hidden-arrow"
                            href="#"
                            role="button"
                            aria-expanded="false"
                            aria-label="More options"
                        >
                            <i className="fas fa-ellipsis-h fa-lg"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li><a className="dropdown-item" href="#">Aide</a></li>
                            <li><a className="dropdown-item" href="#">Feedback</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

import React, {useContext, useEffect} from "react";
import { Dropdown, initMDB } from "mdb-ui-kit";

import "mdb-ui-kit/css/mdb.min.css";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {UserInfoContexte} from "@providers/UserInfoContexte.jsx";
import SearchModalButton from "@components/searchs/SearchModalButton.jsx";

export default function Menu() {
    const navigate = useNavigate();
    const { user } = useContext(UserInfoContexte);
    const [show, setShow] = React.useState(false);

  useEffect(() => {
      initMDB({ Dropdown });
  }, []);

  const logout = ()=>{
      Cookies.remove("token");
      navigate("/", { replace: true });
  }

  const handleProfile = ()=>{
      navigate("/profile", { replace: true });
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid justify-content-between">
            
              <div className="d-flex">

                  <a className="navbar-brand me-2 mb-1 d-flex align-items-center" onClick={ () => navigate("/dashboard", { replace: true })}>
                      <img
                          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                          height="20"
                          alt="MDB Logo"
                          loading="lazy"
                          style={{marginTop: "2px"}}
                      />
                  </a>

                  <form className="input-group w-auto my-auto d-none d-sm-flex">
                      <input
                          autoComplete="off"
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          style={{minWidth: "125px"}}
                      />
                      <span className="input-group-text border-0 d-none d-lg-flex"
                      ><i className="fas fa-search"></i
                      ></span>

                  </form>

                 <button className="btn btn-secondary btn-sm rounded-pill" onClick={ handleShow }>rechercher des amis</button>

                  <SearchModalButton show={show} setShow={setShow}/>

              </div>

              <ul className="navbar-nav flex-row">
                  <li className="nav-item dropdown me-3 me-lg-1">
                      <a
                          data-mdb-dropdown-init
                          className="nav-link dropdown-toggle hidden-arrow"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          aria-expanded="false"
                      >
                          <i className="fas fa-user fa-lg"></i>
                      </a>
                      <ul
                          className="dropdown-menu dropdown-menu-end gap-3 p-2"
                          aria-labelledby="navbarDropdownMenuLink"
                      >
                          <li>
                              <div className="col">
                                  <img
                                      src={user.picturePath}
                                      alt="user"
                                      className="rounded-circle shadow-lg"
                                      style={{ width: 40, height: 40, objectFit: "cover" }}
                                      onClick={ handleProfile }
                                  />
                              </div>
                          </li>
                          <li>
                              <span className="badge  bg-success">{ user.fullName }</span>
                          </li>
                          <li>
                              <span className="badge bg-danger" onClick={logout}>logout</span>
                          </li>

                      </ul>
                  </li>
                  <li className="nav-item dropdown me-3 me-lg-1">
                      <a
                          data-mdb-dropdown-init
                          className="nav-link dropdown-toggle hidden-arrow"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          aria-expanded="false"
                      >
                          <i className="fas fa-bell fa-lg"></i>
                          <span className="badge rounded-pill badge-notification bg-danger">12</span>
                      </a>
                      <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="navbarDropdownMenuLink"
                      >
                          <li>
                              <a className="dropdown-item" href="#">Some news</a>
                          </li>
                          <li>
                              <a className="dropdown-item" href="#">Another news</a>
                          </li>
                          <li>
                              <a className="dropdown-item" href="#">Something else here</a>
                          </li>
                      </ul>
                  </li>
                  <li className="nav-item dropdown me-3 me-lg-1">
                      <a
                          data-mdb-dropdown-init
                          className="nav-link dropdown-toggle hidden-arrow"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          aria-expanded="false"
                      >
                          <i className="fas fa-chevron-circle-down fa-lg"></i>
                      </a>
                      <ul
                          className="dropdown-menu dropdown-menu-end p-3 "
                          aria-labelledby="navbarDropdownMenuLink"
                      >

                      </ul>
                  </li>
              </ul>

          </div>
      </nav>

  );
}

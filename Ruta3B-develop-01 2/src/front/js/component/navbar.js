import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import logo3 from "../../img/logo3.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: "33%",
        }}
        className=" p-1  m-auto text-center items-navbar "
      >
        <img
          style={{ width: "33%", borderRadius: "30px" }}
          className="text-center image-navbar"
          src={logo3}
          alt=""
        />
      </div>{" "}
      {store.auth ? (
        <nav className="container">
          <div className="container-navbar d-flex w-100 m-0 p-0">
            <div className="navbar-links">
              <ol className="mt-4 d-flex justify-content-start">
                <li className="link">
                  <Link to="/" className="text-dark  p-2 nav-item">
                    Inicio{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="link">
                  <Link to="restaurantes" className="text-dark p-2 nav-item">
                    Restaurantes{" "}
                  </Link>{" "}
                </li>{" "}
              </ol>{" "}
            </div>{" "}
            <div className="d-flex justify-content-end items-navbar items-navbar-bottom">
              <Link
                to="/"
                type="button"
                className="btn  btn-sm h-50 m-3"
                style={{
                  backgroundColor: "rgb(255, 200, 67)",
                  color: "black",
                }}
                onClick={() => actions.logout()}
              >
                Cerrar sesión{" "}
              </Link>{" "}
              <div
                type="button"
                className="btn  btn-sm h-50 m-3"
                style={{
                  backgroundColor: "rgb(255, 200, 67)",
                  color: "black",
                }}
                onClick={() =>
                  localStorage.getItem("esLocal") &&
                  !localStorage.getItem("esUsuario")
                    ? navigate("/restaurante")
                    : navigate("/usuario")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </nav>
      ) : (
        <nav className="container">
          <div className="container-navbar d-flex w-100 m-0 p-0">
            <div className="navbar-links">
              <ol className="mt-4 d-flex justify-content-start">
                <li className="link">
                  <Link to="/" className="text-dark p-2 mt-2 nav-item">
                    Inicio{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="link">
                  <Link
                    to="/restaurantes"
                    className="text-dark p-2 mt-2 nav-item"
                  >
                    Restaurantes{" "}
                  </Link>{" "}
                </li>{" "}
              </ol>{" "}
            </div>{" "}
            <div className="d-flex justify-content-end items-navbar items-navbar-bottom">
              <Link
                to="/login"
                type="button"
                className="btn  btn-sm h-50 m-3"
                style={{
                  backgroundColor: "rgb(255, 200, 67)",
                  color: "black",
                }}
              >
                Iniciar sesión{" "}
              </Link>{" "}
              <Link
                to="/seleccion-registro"
                type="button"
                className="btn  btn-sm h-50 m-3"
                style={{
                  backgroundColor: "rgb(255, 200, 67)",
                  color: "black",
                }}
              >
                Registrarse{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </nav>
      )}{" "}
      <hr />
    </>
  );
};

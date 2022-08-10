import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/perfilRestaurante.css";
import { ComentarioFacebook } from "../component/comentarioFacebook";

export const RutaComida = ({ nombre, descripcion, id, tipo_local }) => {
  const { store, actions } = useContext(Context);
  const [date, setDate] = useState("");

  const { theid } = useParams();

  const id2 = store.restaurantes.map((a) => a.id);

  const handleSubmit = async (e) => {
    actions.addReserva(store.profiles?.id, date);
    actions.reservarlocal(store.restaurantes[theid - 1]?.id);
  };

  useEffect(() => {
    actions.getInformationCurrentMember();
    actions.getRestaurantes();
  }, []);
  return (
    <>
      <div className="mt-2 m-auto central d-flex">
        <div
          className="d-flex m-auto"
          style={{
            height: "300px",

            width: "550px",
          }}
        >
          {" "}
          <img
            className="w-100"
            src={store.restaurantes[theid - 1]?.foto}
            alt=""
          />
        </div>
        <div></div>
        <div
          className="content m-auto"
          style={{
            borderStyle: " solid ",
            borderWidth: "3px",
            height: "300px",
            width: "550px",
            marginLeft: "1cm",
            borderColor: "rgb(255, 200, 67)",
            borderRadius: "20px",
          }}
        >
          <div className="offer">
            <h5>Precio medio del ticket: </h5>
            <strong className="">
              {store.restaurantes[theid - 1]?.precio} €
            </strong>
          </div>

          <div
            className="text-center informacion"
            style={{ marginLeft: "40px", marginTop: "40px" }}
          >
            <h4>
              <em>{store.restaurantes[theid - 1]?.nombre}</em>
            </h4>
            <hr className="w-50 m-auto" />
            <p className="mt-5 fs-4 text">
              {store.restaurantes[theid - 1]?.descripcion}
            </p>
          </div>
        </div>
      </div>
      {store.auth &&
      store.auth != "" &&
      store.auth != undefined &&
      localStorage.getItem("esUsuario") ? (
        <div className="mt-5 text-center m-auto w-75">
          <form onSubmit={handleSubmit} action="">
            <input
              className="input text-center m-auto"
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id="start"
              name="trip-start"
            ></input>
            <button
              className="btn btn m-2"
              style={{ backgroundColor: "rgb(255, 200, 67)", color: "black" }}
            >
              Hacer una reserva
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      <div className="inferior d-flex m-auto mt-5">
        <ComentarioFacebook theid={theid} />
      </div>
      <div className="w-25 m-auto text-center">
        <Link className="" to="/restaurantes">
          <span
            className="mt-3 text-center btn "
            href="#"
            role="button"
            style={{ backgroundColor: "rgb(255, 200, 67)", color: "black" }}
          >
            Volver atrás
          </span>
        </Link>
      </div>
    </>
  );
};

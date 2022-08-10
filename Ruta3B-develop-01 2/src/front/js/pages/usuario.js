import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";

import CardHome from "./../pages/cardHome.jsx";
import { CarruselCard } from "../component/carruserCard";

import "../../styles/user.css";
import "../../styles/loginError.css";

export const Usuario = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getFavorit();
    actions.getInformationCurrentMember();
    actions.getReserva();
  }, []);

  // const foto=store.restaurantes.map(a=>a.foto)
  // console.log(foto);
  const date = store.restaurantes.map((a) => a.date);
  // console.log(date);
  //  console.log(store.profiles?.date)

  //console.log(store.reserva[0]?.foto);

  //console.log(store.reserva[store.reserva.length-1]);

  const reservasFecha = store.profiles?.date;
  console.log(reservasFecha);

  // reservasFecha.map(item=>console.log(item))

  const verResera = () => {
    Swal.fire({
      title:
        "Tienes una reserva en " +
        store.reserva[store.reserva.length - 1]?.nombre,
      text: "El dia " + store.profiles?.date,
      imageUrl: store.reserva[0]?.foto,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      width: 600,
      padding: "3em",
      color: "#000000",
      confirmButtonColor: "#ffc843",
    });
  };

  return (
    <>
      {store.auth &&
      store.auth != "" &&
      store.auth != undefined &&
      localStorage.getItem("esUsuario") ? (
        <div className="container-fluid">
          <div className="user">
            <div className="row mx-4">
              <div className="d-flex">
                <h1>
                  Ey, {store.profiles?.nombre} {store.profiles?.apellido}
                </h1>
              </div>

              <div className="col-10 congrats">
                <p>
                  Enhorabuena, {store.profiles?.nombre}! <br></br>
                  <br></br>A partir de ahora, eres miembro de la gran comunidad
                  RUTA 3B, donde podrás encontrar esos sitios que cumplen con
                  nuestra condición 3B, que sean buenos, bonitos y baratos en
                  esta gran ciudad. <br></br>
                  <br></br> No olvides dejar un comentario con tu experiencia y
                  una valoración, tu opinión es importante para nosotros y el
                  resto de la comunidad, además de participar en nuestro sorteo
                  sorpresa mensual.
                </p>
              </div>

              <div className="lineSeparating"></div>

              <div className="text-center">
                <button
                  onClick={verResera}
                  type="button"
                  className=" btn  btn-sm h-50 m-3"
                  style={{
                    backgroundColor: "rgb(255, 200, 67)",
                    color: "black",
                  }}
                >
                  Ver mis reservas
                </button>
              </div>
              <div className="d-flex mx-auto">
                <div className="col-12">
                  <h2 className="text-center mx-auto">Mis sitios favoritos</h2>
                </div>
              </div>
              <CarruselCard />
            </div>
          </div>
        </div>
      ) : (
        <div className="div-err-login text-center">
          <h2>Primero debería registrarse!</h2>
          <button
            type="button"
            className="btn  btn-sm h-50 m-3"
            style={{
              backgroundColor: "rgb(255, 200, 67)",
              color: "black",
            }}
          >
            <Link
              className=" button-err"
              to="/"
              style={{
                backgroundColor: "rgb(255, 200, 67)",
                color: "black",
              }}
            >
              Volver al Inicio
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

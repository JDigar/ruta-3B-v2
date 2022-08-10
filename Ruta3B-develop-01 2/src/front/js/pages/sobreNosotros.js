import React from "react";
import "../../styles/perfilRestaurante.css";

export const Nosotros = () => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: "rgb(255, 200, 67)",
          padding: "6rem",
        }}
      >
        <h2>
          <strong> Sobre nosotros </strong>
        </h2>
        <p>
          Ey! Como nos alegra verte por aquí! Si estás aquí es que eres miembro
          o estás pensando en ser miembro de la <strong> RUTA 3 B </strong> ,
          donde podrás exponer de forma simple y rapida tus servicios y
          promociones basados en nuestra politica 3 B{" "}
          <strong> "Bueno, Bonito y Barato". </strong> No tengas miedo.! por muy
          pequeño que seas y aunque no te encuentres en el centro de la ciudad,
          nosotros te ayudamos a ofrecer tus servicios, porque a todos nos gusta
          ir de copas junto a un buen tapeo, comer bien a un precio justo y por
          supuesto, conocer locales nuevos que se esconden en los barrios y sus
          infinitas calles que conforman esta hermosa ciudad. <br />
          Por otra parte, si eres usuario podrás disfrutar de todos los locales
          que cumplen con la política de la <strong> RUTA 3 B </strong>.{" "}
        </p>{" "}
        <h2>
          <strong> Nuestra política </strong>{" "}
        </h2>{" "}
        <p>
          La política de la <strong>RUTA 3B</strong> se basa en ofrecer locales
          con una <strong> BUENA CALIDAD </strong> , a la vez de un{" "}
          <strong> BUEN TRATO AL CLIENTE </strong> y un{" "}
          <strong> BUEN PRECIO </strong>. Por favor, si tu local no cumple con
          los requisitos de nuestra política le pedimos que no registre su
          local.{" "}
        </p>{" "}
      </div>{" "}
    </>
  );
};

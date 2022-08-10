import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ComentarioFacebook = ({theid}) => {
  const { store, actions } = useContext(Context);
    
  useEffect(() => {
    if (window.FB) {
        window.FB.XFBML.parse();
    }
  }, []);
  return (
    <div
      className="fb-comments m-auto"
      style={{ backgroundColor: "rgb(255, 200, 67)" }}
      data-href={`${process.env.BACKEND_URL}/ruta-comida/${theid}`}
      data-width=""
      data-numposts="2"
      data-lazy={true}
    ></div>
  );
};

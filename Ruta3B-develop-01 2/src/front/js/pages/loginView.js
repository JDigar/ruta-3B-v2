import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginView = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bool = await actions.login(email, password, type);
    console.log(bool);
    if (bool) {
      navigate("/restaurante", { replace: true });
    } else {
      navigate("/usuario", { replace: true });
    }
  };
  return (
    <div className="container text-center">
      <form
        style={{
          backgroundColor: "rgb(255, 200, 67)",
          padding: "18px",
          borderRadius: "10px",
        }}
        className="mt-5 h-50 w-50 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-3  ">
          <h6 className="mb-3 text-start">
            Introduce tu cuenta de correo electrónico
          </h6>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <h6 className="mb-3 text-start">Introduce tu contraseña</h6>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
          />
        </div>
        <div>
          <label className="p-2">¿Eres propietario de un restaurante?</label>
          <input
            style={{ width: "30px", height: "17px" }}
            className="display-1"
            onChange={(e) => {
              setType(!type);
            }}
            defaultChecked={type}
            type="checkbox"
          />
        </div>
        <div className=" union d-flex">
          <button
            style={{ backgroundColor: "white" }}
            type="submit"
            className="m-auto btn"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

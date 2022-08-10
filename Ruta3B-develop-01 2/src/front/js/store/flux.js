import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  const [type, setType] = useState(false);

  return {
    store: {
      auth: false,
      url: process.env.BACKEND_URL,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },

      ],
      restaurantes: [],
      profiles: [],
      likes: [],
      reserva: [],
      restaurante: [],
      went: [],
      profileRestaurante: [],
      url: [],
      precio: [],
    },

    actions: {
     
      /**AÑADIR A FAVORITOS */

      addFavorite: async (id) => {
        console.log(id);

        const response = await fetch(
          process.env.BACKEND_URL + "/api/favlocales/" + id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setStore({
            auth: true,
          });
        } else if (response.status === 208) {
          alert("Este restaurante ya lo tienes en favoritos");
        }

        // console.log(data);
        return true;
      },
      
      removeFavorite: async (id) => {
        fetch(process.env.BACKEND_URL + "/api/favlocales/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) =>
            setStore({
              likes: data,
            })
          );
        return true;
      },
      getFavorit: (id_user, id_local) => {
        fetch(process.env.BACKEND_URL + "/api/user/favoritos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) =>
            setStore({
              likes: data,
            })
          );
      },
      addWent: (nombre) => {
        //Creamos la funcion para obtener el nombre con el Onclick
        const store = getStore(); //Obtenemos Store con "getStore"
        setStore({
          went: store.went.concat(nombre),
        }); //Actualizamos la informacion que está en like concatenando el valor de name.
      },


      /**Agregar reserva */

      addReserva: async (id,date) => {
        console.log(id);

        const response = await fetch(
          process.env.BACKEND_URL + "/api/addReserva/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              id: id,
              date:date,
          }),
      });
      if (response.ok) {
          console.log("Datos guardados");
      } else {
          console.log("No se ha podido modificar el dato");
      }

      },
      reservarlocal: async (id) => {
        console.log(id);

        const response = await fetch(
          process.env.BACKEND_URL + "/api/reservarlocal/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setStore({
            auth: true,
            
          });
          
        } else if (response.status === 208) {
          alert("Este restaurante ya lo tienes en reservas");
        }

        // console.log(data);
        return true;
      },
      getReserva: (id_user, id_local) => {
        fetch(process.env.BACKEND_URL + "/api/user/reserva", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) =>
            setStore({
              reserva: data,
            })
          );
      },
      addWent: (nombre) => {
        //Creamos la funcion para obtener el nombre con el Onclick
        const store = getStore(); //Obtenemos Store con "getStore"
        setStore({
          went: store.went.concat(nombre),
        }); //Actualizamos la informacion que está en like concatenando el valor de name.
      },
      

      /****************************************************** */
      login: async (email, password, type) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              type: type,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.status);
          if (response.status === 200) {
            setStore({
              auth: true,
            });
            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            console.log(data.type);
            if (data.type) {
              localStorage.setItem("esLocal", data.type);
              return true;
            } else {
              localStorage.setItem("esUsuario", false);
              return false;
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      syncTokenFromLocalStorage: () => {
        const auth = localStorage.getItem("token");
        console.log("app loaded, synching the localstorage token");
        if (auth && auth != "" && auth != undefined)
          setStore({
            auth: auth,
          });
      },
      getInformationCurrentMember: () => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) =>
            setStore({
              profiles: data,
            })
          );
      },
      getRestaurantes: async () => {
        const store = getStore();
        // fetching data from the backend
        const resp = await fetch(process.env.BACKEND_URL + "/api/restaurantes")
          .then((resp) => resp.json())
          .then((data) =>
            setStore({
              restaurantes: data,
            })
          );
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("esLocal");
        localStorage.removeItem("esUsuario");
        setStore({
          auth: false,
        });
      },
      
      getInformationCurrentRestaurant: () => {
        fetch(process.env.BACKEND_URL + "/api/profile-restaurante", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) =>
            setStore({
              profileRestaurante: data,
            })
          );
      },

      getRestaurantes: async () => {
        const store = getStore();

        // fetching data from the backend
        const resp = await fetch(process.env.BACKEND_URL + "/api/restaurantes")
          .then((resp) => resp.json())
          .then((data) =>
            setStore({
              restaurantes: data,
            })
          );
      },

      registroUsuario: async (nombre, apellido, email, password) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.status);
        if (response.status == 201) {
          const data = await response.json();
         
          return true;
        } else {
          alert("Ya hay un usuario registrado con ese email");
          return false;
        }
        
      },

      añadirPrecio: async (id, precio) => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/addPrice/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              id: id,
              precio: precio,
            }),
          }
        );
        if (response.ok) {
          console.log("Datos guardados");
        } else {
          console.log("No se ha podido modificar el dato");
        }
      },

      

      // REGISTRO DE USUARIO
      RegistroLocales: (nombre, email, password, tipo_local, descripcion) => {
        fetch(process.env.BACKEND_URL + "/api/locales", {
          method: "POST",
          body: JSON.stringify({
            nombre: nombre,
            email: email,
            password: password,
            tipo_local: tipo_local,
            descripcion: descripcion,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      },

      
        añadirPrecio: async (id, precio) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/addPrice/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        id: id,
                        precio: precio,

                    }),
                });
                if (response.ok) {
                    console.log("Datos guardados");
                } else {
                    console.log("No se ha podido modificar el dato");
                }
            },
            modificarDatos: async (id,nombre,tipo_local,descripcion) => {
                const response = await fetch(process.env.BACKEND_URL + "/api/editInfoRestaurantes/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        id: id,
                        nombre:nombre,
                        tipo_local:tipo_local,
                        descripcion:descripcion,
                    }),
                });
                if (response.ok) {
                    console.log("Datos guardados");
                } else {
                    console.log("No se ha podido modificar el dato");
                }
            },
            
           
            uploadFile: async (uploadImages) => {
                const store = getStore();
                const cloud_name = "dqa8txoeg"; //"pluggedin";
                const preset = "ehajybj3"; //"icnpftra";
                const url_claudinari = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
                const formData = new FormData();
                formData.append("file", uploadImages);
                formData.append("upload_preset", `${preset}`);
                try {
                    const response = await fetch(
                        //   process.env.BACKEND_URL + "/api/hello",
                        url_claudinari, {
                            method: "POST",
                            body: formData,
                        }
                    );
                    if (response.ok) {
                        const data = await response.json();
                        //   actions.putImage(data.secure_url);
                        // console.log(data);
                        // console.log(data.url)
                        setStore({url:data.url})
                        // console.log(data.url)
                            console.log(store.url);
                    }
                } catch (error) {
                    console.log("message", error);
                };
            },

            añadirFoto: async (id)=>{
                const store = getStore();
                const response = await fetch(process.env.BACKEND_URL + "/api/addPhoto/"+id,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                      body: JSON.stringify({
                        id:id,
                        foto: store.url,

                      }),
                    }
                  );
                  if (response.ok) {
                    
                    alert("Datos guardados");
                  } else {
                    alert("No se ha podido modificar el dato");
                  }

             }
    }
  }
}
export default getState;

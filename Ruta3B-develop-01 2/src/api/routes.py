"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Locales, Direccion
from api.utils import generate_sitemap, APIException
# from geopy.geocoders import Nominatim
import json
import datetime

# # flask jwt paquete de instalacion
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)




#GET de restaurantes 

@api.route('/restaurantes', methods=['GET'])
def get_restaurantes():
    
    restaurantes = Locales.query.all()
    all_restaurantes = list(map(lambda x: x.serialize(), restaurantes))

    return jsonify(all_restaurantes), 200
 # Create a route to authenticate your users and return JWTs. The
 # create_access_token() function is used to actually generate the JWT.





@api.route("/login", methods=["POST"])
def login():
    # email = request.json.get("email", None)
    # password = request.json.get("password", None)
    # type = request.json.get("type", None)
    email, password, type = request.json.get('email', None), request.json.get('password', None), request.json.get('type', None)
    if not (email and password):
        return jsonify({'message': 'Data not provided'}), 400
    # traer de mi base de datos un usuario por su email
    user = None
    if type:
        # restaurante
        user = Locales.query.filter_by(email=email).one_or_none()
        if not user:
         return jsonify({'message': 'Email is not valid'}), 404
        if email != user.email or password != user.password:
            return jsonify({"msg": "Bad username or password"}), 401
    else:
        # usuario
        user = User.query.filter_by(email=email).one_or_none()
        if not user:
            return jsonify({'message': 'Email is not valid'}), 404
        if email != user.email or password != user.password:
            return jsonify({"msg": "Bad username or password"}), 401
            
    
    expired=datetime.timedelta(minutes=240)

    access_token = create_access_token(identity=email, expires_delta=expired)
    return jsonify({"access_token":access_token,"type":type})

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.




@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    return jsonify(user.serialize()), 200


@api.route("/profile-restaurante", methods=["GET"])
@jwt_required()
def profile_protected():
    # Access the identity of the current user with get_jwt_identity
    current_local = get_jwt_identity()
    local = Locales.query.filter_by(email=current_local).first()
    
    return jsonify(local.serialize()), 200



# #NUEVO USUARIO
@api.route('/user', methods=['POST'])   
def create_new_user():
    body = json.loads(request.data)
    new_user = User(nombre=body["nombre"],apellido=body["apellido"],email=body["email"], password=body["password"])
    db.session.add(new_user)
    db.session.commit()
    response_body={
        "msg": ("usuario creado", new_user)
    }
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token), 201 



# #NUEVO USUARIO LOCAL
@api.route('/locales', methods=['POST'])   
def create_new_user_locales():
    body = json.loads(request.data)
    new_user_local = Locales(nombre=body["nombre"],email=body["email"], 
    password=body["password"], tipo_local=body["tipo_local"], descripcion=body["descripcion"])
    db.session.add(new_user_local)
    db.session.commit()
    response_body={
        "msg": ("usuario de local creado", new_user_local)
    }
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token) 



@api.route('/favlocales/<int:local_id>', methods=['POST', 'DELETE'])
@jwt_required()
def save_fav_local(local_id):

    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if request.method=='POST':
        local = Locales.query.get(local_id)
        if local not in user.localesfav:
            user.localesfav.append(local)
            db.session.add(local)
            db.session.commit()
            return jsonify({'response': "Favorit add"}),200
        
        else: 
            return jsonify({"response" : "Ya tienes este local favorito"}), 208
        

    if request.method=="DELETE":
        local = Locales.query.get(local_id)
        user.localesfav.remove(local)
        db.session.commit()
        user = User.query.filter_by(email=email).first()
        user_favorites = user.localesfav
        all_favorites = [favorite.serialize() for favorite in user_favorites]
        return jsonify(all_favorites),200

        




@api.route('/user/favoritos', methods=['GET'])
@jwt_required()
def get_fav_list():
    email = get_jwt_identity()
    userfavs = User.query.filter_by(email=email).first()
    print(email)
    print(userfavs)

    if userfavs:
        user_favorites = userfavs.localesfav
        all_favorites = [favorite.serialize() for favorite in user_favorites] # serializame por cada favorito, en user_favorites
        if len(all_favorites)==0:
            return jsonify(all_favorites),404
        return jsonify(all_favorites), 200
    
   
#Coger reserva:    
    
@api.route('/reservarlocal/<int:local_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def make_reservation(local_id):

    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if request.method=='PUT':
        local = Locales.query.get(local_id)
        if local not in user.reservalocales:
            user.reservalocales.append(local)
            db.session.add(local)
            db.session.commit()
            return jsonify({'response': "Reserva add"}),200
        
        else: 
            return jsonify({"response" : "Ya tienes una reserva"}), 208
        

    if request.method=="DELETE":
        local = Locales.query.get(local_id)
        user.reservalocales.remove(local)
        db.session.commit()
        user = User.query.filter_by(email=email).first()
        user_reserva = user.reservalocales
        all_reserva = [reserva.serialize() for reserva in user_reserva]
        return jsonify(all_reserva),200



@api.route('/user/reserva', methods=['GET'])
@jwt_required()
def get_reservas_list():
    email = get_jwt_identity()
    userreserva = User.query.filter_by(email=email).first()
    print(email)
    print(userreserva)

    if userreserva:
        user_reserva = userreserva.reservalocales
        all_reserva = [reserva.serialize() for reserva in user_reserva] # serializame por cada favorito, en user_favorites
        if len(all_reserva)==0:
            return jsonify({'error': 'No reserva favoritos'}),404
        return jsonify(all_reserva), 200


#Añadir precio desde perfil de restaurante:

@api.route('/addPrice/<int:id>', methods=['PUT'])
@jwt_required()
def edit_precio_local(id):
    
    
    local = Locales.query.get(id)
    
    nombre = request.json.get('nombre', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    tipo_local = request.json.get('tipo_local', None)
    descripcion = request.json.get('descripcion', None)
    precio = request.json.get('precio', None)
    

    if  (nombre or email or password or tipo_local or descripcion or precio):
            if nombre != None:
                local.nombre = nombre
            if email != None:  
                local.email = email
            if password != None:
                local.password = password
            if tipo_local != None:
                local.tipo_local = tipo_local
            if descripcion !=None:
                local.descripcion = descripcion
            if precio != None:
                local.precio = precio
            
            
            
            db.session.commit()
            
            return jsonify({'results': local.serialize()}),201


@api.route('/addReserva/<int:id>', methods=['PUT'])
@jwt_required()
def add_reserva(id):
    
    
    user = User.query.get(id)
    
    nombre = request.json.get('nombre', None)
    apellido = request.json.get('apellido', None)
    email = request.json.get('email', None)
    foto_user = request.json.get('foto_user', None)
    password = request.json.get('password', None)
    date = request.json.get('date', None)
    

    if  (nombre or apellido or email or foto_user or password or date):
            if nombre != None:
                user.nombre = nombre
            if apellido != None:  
                user.apellido = apellido
            if email != None:
                user.email = email
            if foto_user != None:
                user.foto_user = foto_user
            if password !=None:
                user.password = password
            if date != None:
                user.date = date
                     
            
            db.session.commit()
            
            return jsonify({'results': user.serialize()}),201



#Añadir foto desde perfil de restaurante:

@api.route('/addPhoto/<int:id>', methods=['PUT'])
@jwt_required()
def add_foto_local(id):
    
    
    local = Locales.query.get(id)
    
    nombre = request.json.get('nombre', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    tipo_local = request.json.get('tipo_local', None)
    descripcion = request.json.get('descripcion', None)
    precio = request.json.get('precio', None)
    foto = request.json.get('foto', None)

    if  (nombre or email or password or tipo_local or descripcion or precio or foto):
            if nombre != None:
                local.nombre = nombre
            if email != None:  
                local.email = email
            if password != None:
                local.password = password
            if tipo_local != None:
                local.tipo_local = tipo_local
            if descripcion !=None:
                local.descripcion = descripcion
            if precio != None:
                local.precio = precio
            if foto != None:
                local.foto = foto
            
            
            db.session.commit()
            
            return jsonify({'results': local.serialize()}),201
    


#Añadir fotos para el restaurante:

@api.route('/editInfoRestaurantes/<int:id>', methods=['PUT'])
@jwt_required()
def edit_info_general_locales(id):
    
    
    local = Locales.query.get(id)
    
    nombre = request.json.get('nombre', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    tipo_local = request.json.get('tipo_local', None)
    descripcion = request.json.get('descripcion', None)
    precio = request.json.get('precio', None)
    foto = request.json.get('foto', None)

    if  (nombre or email or password or tipo_local or descripcion or precio or foto):
            if nombre != None:
                local.nombre = nombre
            if email != None:  
                local.email = email
            if password != None:
                local.password = password
            if tipo_local != None:
                local.tipo_local = tipo_local
            if descripcion !=None:
                local.descripcion = descripcion
            if precio != None:
                local.precio = precio
            if foto != None:
                local.foto = foto
            
            
            db.session.commit()
            
            return jsonify({'results': local.serialize()}),201











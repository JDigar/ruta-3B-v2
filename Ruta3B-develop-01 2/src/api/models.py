from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



# Many to Many likes
likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('locales_id', db.Integer, db.ForeignKey('locales.id'), primary_key=True)
)
# Many to Many reservations
reservations = db.Table('reservations',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('locales_id', db.Integer, db.ForeignKey('locales.id'), primary_key=True)
)




# TABLA PARA REGISTRO DE USUARIO

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellido = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120),  nullable=False)
    foto_user = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(80), nullable = False)
    date = db.Column(db.Date, nullable = True)
    # favoritos = db.relationship('Favoritos', backref='user', lazy=True)
    localesfav = db.relationship('Locales', secondary=likes, lazy='subquery', backref=db.backref('este usuario le gustan estos locales', lazy=True))
    reservalocales = db.relationship('Locales', secondary=reservations, lazy='subquery', backref=db.backref('este usuario registra con estos locales', lazy=True))

    


    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email":self.email,
            "foto_user": self.foto_user,
            "date": self.date,
            "likes": [favorite.serialize() for favorite in self.localesfav],
            "reservations": [reserva.serialize() for reserva in self.reservalocales]
            # do not serialize the password, its a security breach
        }



# TABLA PARA REGISTRO DE RESTAURANT
class Locales(db.Model):
    __tablename__ = 'locales'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    tipo_local = db.Column(db.String(80), unique=False, nullable=False)
    descripcion = db.Column(db.String(250), unique=False, nullable=False)
    precio = db.Column(db.Integer, unique=False, nullable=True)
    foto = db.Column(db.String(500), unique=False, nullable=True)
    # favoritos = db.relationship('Favoritos', backref='locales', lazy=True)
    
    

    def __repr__(self):
        return f'<Locales> {self.id} {self.email}'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "tipo_local": self.tipo_local,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "foto": self.foto,
            
            # do not serialize the password, its a security breach
        }

# TABLA DE DIRECCIÓN
class Direccion(db.Model):
    __tablename__ = 'direccion'
    id = db.Column(db.Integer, primary_key=True)
    barrio = db.Column(db.String(120), nullable=False)
    calle = db.Column(db.String(120), nullable=False)
    numero = db.Column(db.Integer,  nullable=False)
    

    def __repr__(self):
        return f'<Direccion {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "barrio": self.barrio,
            "calle": self.calle,
            "numero": self.numero,
            # do not serialize the password, its a security breach
        }




 
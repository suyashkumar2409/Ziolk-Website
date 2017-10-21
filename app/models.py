from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db, login_manager
from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __repr__(self):
        return '<Role %r>' % self.name

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Boolean, default = False)
    designs = db.relationship('Design', backref = 'design', lazy = 'dynamic')

    def generate_confirmation_token(self, expiration = 3600*24):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm':self.id})

    def confirm(self, token, expiration = 3600*24):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        try:
            data = s.loads(token)
        except:
            return False

        if data.get('confirm') != self.id:
            return False
        self.confirmed = True
        db.session.add(self)
        return True

    def generate_reset_token(self, expiration = 3600*24):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm':self.id})

    @staticmethod
    def confirm_reset(token, expiration = 3600*24):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        try:
            data = s.loads(token)
        except:
            return False
        return data.get('confirm')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Design(db.Model):
    __tablename__ = 'designs'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64), unique = True, index = True)
    user = db.Column(db.Integer, db.ForeignKey('users.id'))
    timeCreated = db.Column(db.DateTime)
    timeLastUpdated = db.Column(db.DateTime)
    # find a way to save design
    # create a relationship column in users and find a way to migrate it

    def __repr__(self):
        return '<Design %r>' % self.name

# Used to create new revisions
# class Trial(db.Model):
#     __tablename__ = 'trials'
#     id = db.Column(db.Integer, primary_key = True)


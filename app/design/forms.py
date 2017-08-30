from flask_wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import Required, Email, Length, Regexp, EqualTo
from wtforms import ValidationError
from ..models import User

class LoginForm(Form):
	email = StringField('Email', validators = [Required(), Length(1, 64), Email()])
	password = PasswordField('Password', validators = [Required()])
	remember_me = BooleanField('Keep me logged in')
	submit = SubmitField('Log In')

class RegistrationForm(Form):
	
	email = StringField('Email', validators = [Required(), Length(1, 64), Email()])
	username = StringField('Username', validators=[Required(), Length(1, 64), Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,'Usernames must have only letters, ''numbers, dots or underscores')])
	password = PasswordField('Password', validators=[Required(), EqualTo('password2', message='Passwords must match.')])
	password2 = PasswordField('Confirm password', validators=[Required()])
	submit = SubmitField('Register')
	
	def validate_email(self, field):
		if User.query.filter_by(email=field.data).first():
			raise ValidationError('Email already registered.')
		
	def validate_username(self, field):
		if User.query.filter_by(username=field.data).first():
			raise ValidationError('Username already in use.')

class ForgotPasswordForm(Form):

	email = StringField('Email', validators = [Required(), Length(1, 64), Email()])
	submit = SubmitField('Send Reset Password Link')

	def validate_email(self, field):
		if not User.query.filter_by(email=field.data).first():
			raise ValidationError('No account found registered by that email.')
	
class ResetPasswordForm(Form):
	password = PasswordField('New Password', validators=[Required(), EqualTo('password2', message='Passwords must match.')])
	password2 = PasswordField('Confirm new password', validators=[Required()])
	submit = SubmitField('Reset Password')
	
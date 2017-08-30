from flask_wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import Required, Email, Length, Regexp, EqualTo
from wtforms import ValidationError
from flask_login import current_user
from ..models import User

class ChangeForm(Form):
	
	oldEmail = StringField('Old Email ID', validators = [Required(), Length(1, 64), Email()])
	newEmail = StringField('New Email ID', validators = [Length(1, 64), Email()])
	
	oldPassword = PasswordField('Old password', validators=[Required()])


	password = PasswordField('New Password', validators=[EqualTo('password2', message='Passwords must match.')])
	password2 = PasswordField('Confirm new password')
	submit = SubmitField('Register')
	
	def validate_oldEmail(self, field):
		if current_user.email != field.data:
			raise ValidationError('That is not your current email ID.')

	def validate_newEmail(self, field):
		if User.query.filter_by(email = field.data).first():
			raise ValidationError('Someone is already registered with that email ID.')
	
	def validate_oldPassword(self, field):
		if not current_user.verify_password(field.data):
			raise ValidationError('That is not your old password.')

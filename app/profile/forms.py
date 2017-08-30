from flask_wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import Required, Email, Length, Regexp, EqualTo, Optional
from wtforms import ValidationError
from flask_login import current_user
from ..models import User

class ChangeForm(Form):
	
	oldEmail = StringField('Old Email ID', validators = [Optional(), Length(0, 64), Email()])
	newEmail = StringField('New Email ID', validators = [Optional(), Length(1, 64), Email()])
	
	oldPassword = PasswordField('Old password', validators= [Optional()])


	password = PasswordField('New Password', validators=[Optional(), EqualTo('password2', message='Passwords must match.')])
	password2 = PasswordField('Confirm new password', validators = [Optional()])
	submit = SubmitField('Save Changes')
	
	def validate_oldEmail(self, field):
		##### Its not empty, apply other validators
		if field.data != '':
			if current_user.email != field.data:
				raise ValidationError('That is not your current email ID.')

	def validate_newEmail(self, field):
		if field.data != '':
			if self.oldEmail.data == '':
				raise ValidationError('Please enter the correct old Email ID')
			if User.query.filter_by(email = field.data).first():
				raise ValidationError('Someone is already registered with that email ID.')
			elif current_user.email == field.data:
				raise ValidationError('That is the same as your current email ID')

	def validate_oldPassword(self, field):
		if field.data != '':
			if not current_user.verify_password(field.data):
				raise ValidationError('That is not your old password.')

	def validate_password(self, field):
		if self.oldPassword.data == '':
			raise ValidationError('Please enter the correct Old Password')
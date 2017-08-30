from . import auth as auth_blueprint
from flask import render_template, redirect, url_for, flash, request
from ..models import User
from flask_login import login_required, login_user, logout_user, current_user
from .forms import LoginForm, RegistrationForm
from app import db
from ..email import send_email

@auth_blueprint.route('/login', methods = ['GET', 'POST'])
def login():
	form = LoginForm()

	if form.validate_on_submit():
		user = User.query.filter_by(email = form.email.data).first()

		if user is not None and user.verify_password(form.password.data):
			login_user(user, form.remember_me.data)

			if current_user.confirmed:
				return redirect(request.args.get('next') or url_for('ziolkB.index'))
			else:
				return redirect(url_for('auth.unconfirmed'))
		flash('Invalid username or password')
	return render_template('auth/login.html', form = form)

@auth_blueprint.route('/logout')
@login_required
def logout():
	logout_user()
	flash('You have been logged out.')
	return redirect(url_for('auth.login'))

@auth_blueprint.route('/register', methods = ['GET', 'POST'])
def register():
	form = RegistrationForm()
	if form.validate_on_submit():
		user = User(email = form.email.data, username = form.username.data, password = form.password.data)
		db.session.add(user)
		db.session.commit()

		token = user.generate_confirmation_token()

		send_email(user.email, 'Confirm Your Account', 'auth/email/confirm', user = user, token = token)

		flash('A confirmation email has been sent to you by email.')

		return redirect(url_for('ziolkB.index'))

	return render_template('auth/register.html', form = form)


@auth_blueprint.route('/confirm/<token>')
@login_required
def confirm(token):
	if current_user.confirmed:
		return redirect(url_for('ziolkB.index'))
	if current_user.confirm(token):
		flash('You have confirmed your account. Thanks!')
	else:
		flash('The confirmation link is invalid or has expired.')
	return redirect(url_for('ziolkB.index'))

@auth_blueprint.before_app_request
def before_request():
	if current_user.is_authenticated \
	and not current_user.confirmed \
	and request.endpoint[:5] != 'auth.':
		return redirect(url_for('auth.unconfirmed'))

@auth_blueprint.route('/unconfirmed')
def unconfirmed():
	if current_user.is_anonymous or current_user.confirmed:
		return redirect(url_for('ziolkB.index'))
	return render_template('auth/unconfirmed.html')

@auth_blueprint.route('/confirm')
@login_required
def resend_confirmation():
	if current_user.confirmed:
		flash('Your account has already been confirmed.')
		return redirect(url_for('ziolkB.index'))
	else:
		token = current_user.generate_confirmation_token()
		send_email(current_user.email, 'Confirm Your Account', 'auth/email/confirm', user = current_user, token=token)
		flash('A new confirmation email has been sent to you by email.')
		return redirect(url_for('ziolkB.index'))

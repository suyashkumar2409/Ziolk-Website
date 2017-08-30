from . import profile as profile_blueprint
from flask import render_template, redirect, url_for, flash, request
from ..models import User
from flask_login import login_required, current_user
from .forms import ChangeForm
from app import db

@profile_blueprint.route('/settings', methods = ['GET', 'POST'])
@login_required
def settings():
	form = ChangeForm()

	if form.validate_on_submit():
		user = current_user
		redirectToConfirmationPage = False
		changeHappened = False
		###### A change in email ########
		if form.oldEmail.data != '':
			user.email = form.newEmail.data
			user.confirmed = False
			redirectToConfirmationPage = True
			changeHappened = True

		###### A change in password #####
		if form.oldPassword.data != '':
			user.password = form.password.data
			changeHappened = True

		if changeHappened:
			db.session.add(user)
			db.session.commit()

		if redirectToConfirmationPage:
			return redirect(url_for('auth.resend_confirmation'))
		else:
			return redirect(url_for('ziolkB.index'))
	return render_template('profile/settings.html', form = form)

@profile_blueprint.route('/info')
def info():
	return render_template('profile/info.html', user = current_user)


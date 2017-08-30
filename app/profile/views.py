from . import profile as profile_blueprint
from flask import render_template, redirect, url_for, flash, request
from ..models import User
from flask_login import login_required, current_user
from .forms import ChangeForm
from app import db

@profile_blueprint.route('/settings', methods = ['GET', 'POST'])
def changeSettings():
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


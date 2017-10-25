from . import design as design_blueprint
from flask import render_template, redirect, url_for, flash, request, session
from flask_login import login_required, login_user, logout_user, current_user
from app import db

@design_blueprint.route('/')
@login_required
def design():
	return render_template('/design/design.html')


@design_blueprint.route('/<name>', methods = ['GET', 'POST'])
@login_required
def handleTemplate():
	return render_template('/design/design.html')
from . import design as design_blueprint
from flask import render_template, redirect, url_for, flash, request, session, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from app import db
from ..models import Design
import json

@design_blueprint.route('/')
@login_required
def design():
	return render_template('/design/design.html')


@design_blueprint.route('/<name>', methods = ['GET', 'POST'])
@login_required
def handleTemplate():
	return render_template('/design/design.html')

@design_blueprint.route('/checkName', methods=['GET','POST'])
@login_required
def checkName():
	try:
		designName = request.args.get('designName')
		# print current_user.get_id()
		if  Design.query.filter_by(user = current_user.get_id()).filter_by(name = designName) is None:
			# Can be overwritten
			print "yes"
			return json.dumps({'result':'True'})
		else:
			return json.dumps({'result':'False'})
			print "no"
	except Exception as e:
		return str(e)	
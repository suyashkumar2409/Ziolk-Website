from . import design as design_blueprint
from flask import render_template, redirect, url_for, flash, request, session, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from app import db
from ..models import Design
import json
import datetime

@design_blueprint.route('/')
@login_required
def design():
	return render_template('/design/design.html')


@design_blueprint.route('/<name>', methods = ['GET', 'POST'])
@login_required
def handleTemplate():
#  if GET
# Load from database
# else save to database and restore everything
	if request.method == 'POST':
		objJSon = request.json['data']
		newDesign = Design(name=name, user = current_user.get_id(), timeCreated = datetime.datetime.now(), timeLastUpdated = datetime.datetime.now(), design = json.Stringify(objJson))
		db.session.add(newDesign)
		db.commit()

		# send objJson to front-end and load design
	else:
		objString = Design.query.filter_by(user = current_user.get_id()).filter_by(name = name)
		objJson = json.loads(objString)

		# send objJson to front-end and load design
		


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
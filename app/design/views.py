from . import design as design_blueprint
from flask import render_template, redirect, url_for, flash, request, session, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from app import db
from ..models import Design
import json
import datetime
import traceback

@design_blueprint.route('/')
@login_required
def design():
	return render_template('/design/design.html')


@design_blueprint.route('/custom/<name>', methods = ['GET', 'POST'])
@login_required
def handleTemplate(name):
#  if GET
# Load from database
# else save to database and restore everything
	if request.method == 'POST':
		try:
			obj = request.json
			print obj['canvasfront']
			newDesign = Design(name=name, user = current_user.get_id(), timeCreated = datetime.datetime.now(), timeLastUpdated = datetime.datetime.now(), design = obj)
			db.session.add(newDesign)
			db.session.commit()

			return redirect(url_for('design.handleTemplate', name = name))
		except Exception:
			print traceback.format_exc()
			return traceback.format_exc()

		# rerender = True
		# return render_template('design/design.html', rerender = rerender, objJson = objJson)
		# send objJson to front-end and load design
	else:
		design = Design.query.filter_by(user = current_user.get_id()).filter_by(name = name).first()
		objJson = design.design
		name = design.name
		rerender =True

		return render_template('design/design.html', rerender = rerender, name = name, obj = json.dumps(objJson))

		# send objJson to front-end and load design
		


@design_blueprint.route('/checkName', methods=['POST'])
@login_required
def checkName():
	try:
		designName = request.args.get('designName')
		# print current_user.get_id()
		if  Design.query.filter_by(user = current_user.get_id()).filter_by(name = designName).first() is None:
			# Can be overwritten
			print "yes"
			# return {'result':'True'}

			return json.dumps({'result':'True'})
		else:
			return json.dumps({'result':'False'})
			print "no"
	except Exception as e:
		return str(e)	

@design_blueprint.route('/all')
@login_required
def all():
	designs = Design.query.filter_by(user = current_user.get_id()).order_by(Design.timeLastUpdated.desc())
	designNames = []
	urlNames = []

	for d in designs:
		designNames.append(d.name)
		urlNames.append(d.getUrl())

	totalNum = len(designNames)
	left= totalNum % 3

	return render_template('design/allDesigns.html', designNames = designNames, urlNames = urlNames, left = left, totalNum = totalNum)
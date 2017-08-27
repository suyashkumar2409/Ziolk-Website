from flask import render_template, session, redirect, url_for

from . import ziolkB
# from .forms import NameForm
from .. import db
# from ..models import User

@ziolkB.route('/')
def index():
	return render_template('index.html')
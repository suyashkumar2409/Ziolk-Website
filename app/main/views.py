from flask import render_template, session, redirect, url_for

from . import main
# from .forms import NameForm
from .. import db
# from ..models import User

@main.route('/')
def index():
	return render_template('index.html')
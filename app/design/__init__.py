from flask import Blueprint

design = Blueprint('design', __name__, static_folder='static', static_url_path='/static/design')

from . import views
from flask import Blueprint

ziolkB = Blueprint('ziolkB', __name__	)

from . import views, errors

import os

basedir = os.path.abspath(os.path.dirname(__file__))

POSTGRES = {
    'user': 'postgres',
    'pw': 'password',
    'db': 'my_database',
    'host': 'localhost',
    'port': '5432',
}

class Config:
	SECRET_KEY = os.environ.get('SECRET_KEY') or 'ZiolkEncryption secret Code'
	SQLALCHEMY_COMMIT_ON_TEARDOWN = True
	
	MAIL_SERVER = 'smtp.googlemail.com'
	MAIL_PORT = 587
	MAIL_USE_TLS = True
	MAIL_USERNAME =  os.environ.get('ZIOLK_MAIL_USERNAME')
	MAIL_PASSWORD =  os.environ.get('ZIOLK_MAIL_PASSWORD')


	ZIOLK_MAIL_SUBJECT_PREFIX = '[Ziolk]'
	ZIOLK_MAIL_SENDER = 'ziolk-noreply@ziolk.com'
	ZIOLK_ADMIN = os.environ.get('ZIOLK_ADMIN')

	@staticmethod
	def init_app(app):
		pass

class DevelopmentConfig(Config):
	DEBUG = True

	
	SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
	'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')


class TestingConfig(Config):
	TESTING = True

	SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
	'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')

	
class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
	'sqlite:///' + os.path.join(basedir, 'data.sqlite')

config = {
	'development': DevelopmentConfig,
	'testing' : TestingConfig, 
	'production' : ProductionConfig,

	'default' : DevelopmentConfig
}
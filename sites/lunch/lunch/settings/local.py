from .base import *
SECRET_KEY = ')go(byu^0#-y#$0$8k^j#my+r+e+^altwmjv8hz=@slqxtd*2#'
DEBUG = True
TEMPLATE_DEBUG = True
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
  }
}

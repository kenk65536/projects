"""lunch URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
  https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
  1. Add an import:  from my_app import views
  2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
  1. Add an import:  from other_app.views import Home
  2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
  1. Import the include() function: from django.conf.urls import url, include
  2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import *
from django.contrib import admin
from technet.views import *
urlpatterns = [
  url(r'^$',home, name='home'),
  url(r'^home/$',home),
  url(r'^chinaTest/$', chinaTest, name='chinaTest'),
  url(r'^stores/$', store_list, name='store_list'),
  url(r'^stores/(?P<pk>\d+)/$', store_detail, name='store_detail'),
  url(r'^welcomeForm/$', welcomeForm, name='welcomeForm'),
  url(r'^getViews$',getTest),
  url(r'^postViews$', postTest),
  url(r'^(\d{1,2})/plus/(\d{1,2})/$', add),
  url(r'^(\d{1,2})/math/(\d{1,2})/$', math),
  url(r'^admin/', admin.site.urls),
]

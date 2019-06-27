from django.conf.urls import url, include
from basic_app import views

app_name = 'basic_app'

urlpatterns = [
    url(r'^register/$', views.register, name='register'),
    url(r'^user_login/*', views.user_login, name='user_login'),
]

from django.conf.urls import url
from django.contrib.auth import views as auth_views
from accounts.views import SignUp

app_name = 'accounts'

urlpatterns = [
    url(r'^login/$', auth_views.login, {'template_name': 'accounts/login.html'}, name='login'),
    url(r'^logout/$', auth_views.logout, name='logout'),
    url(r'^signup/$', SignUp.as_view(), name='signup'),
]

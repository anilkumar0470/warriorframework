from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
 	url(r'editCase', views.editCase , name='editCase'),
    url(r'getCaseDataBack', views.getCaseDataBack , name='getCaseDataBack'),
 	url(r'editCase', views.editCase , name='editCase'),
    
]

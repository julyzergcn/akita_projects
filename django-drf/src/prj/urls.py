from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('prj.auth_urls')),
]

from rest_framework import routers
from djoser import views as djoser_views
from todos import views as todos_views

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register("users", djoser_views.UserViewSet)
router.register("todos", todos_views.TodoViewSet)

urlpatterns += [
    path('api/', include(router.urls)),
]

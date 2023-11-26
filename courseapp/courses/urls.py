from django.urls import path, include
from rest_framework import routers
from courses import views


router = routers.DefaultRouter()
router.register('categories', views.CategoryView, basename='categories')
router.register('courses', views.CourseView, basename='courses')

urlpatterns = [
    path('', include(router.urls))
]
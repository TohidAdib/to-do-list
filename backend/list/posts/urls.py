from django.urls import path

from .views import ListViwe,DetailViwe

urlpatterns = [
    path("list/",ListViwe.as_view()),
    path("list/<int:pk>/",DetailViwe.as_view())
]

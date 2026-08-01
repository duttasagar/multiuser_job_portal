from django.urls import path
from .views import RecruiterDashboardView

urlpatterns = [
    path("", RecruiterDashboardView.as_view()),
]
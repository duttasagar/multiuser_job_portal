from django.urls import path
from . import views

urlpatterns = [
    path("verify-otp/", views.verify_otp, name="verify-otp"),
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("forgot-password/", views.forgot_password),
    path("verify-reset-otp/", views.verify_reset_otp),
    path("reset-password/", views.reset_password),
    path("me/", views.MeView.as_view()),
     path("profile/", views.ProfileView.as_view()),


]

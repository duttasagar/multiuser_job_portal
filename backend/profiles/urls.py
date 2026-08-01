from django.urls import path

from .views import (
    ProfileView,
    ProfileCompletionView,
    RecruiterProfileView,
)


urlpatterns = [

    path(
        "",
        ProfileView.as_view(),
        name="profile"
    ),

    path(
        "completion/",
        ProfileCompletionView.as_view(),
        name="profile-completion"
    ),

    path(
        "recruiterProfile/",
        RecruiterProfileView.as_view(),
        name="recruiter-profile"
    ),

]
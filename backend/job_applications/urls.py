from django.urls import path

# from .views import ( ApplyJobView, MyApplicationsView)
# from .views import ApplyJobView,MyApplicationsView
# from .views import RecruiterApplicationsView

from .views import (
    ApplyJobView,
    MyApplicationsView,
    RecruiterApplicationsView,
    UpdateApplicationStatusView
)
urlpatterns = [
    path( "apply/<int:job_id>/", ApplyJobView.as_view()),
    path( "my/", ApplyJobView.as_view()),
    path("my-applications/", MyApplicationsView.as_view()),
    path("recruiter-applications/", RecruiterApplicationsView.as_view()),
    path("status/<int:pk>/", UpdateApplicationStatusView.as_view()),
]


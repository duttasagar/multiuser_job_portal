from django.urls import path
from .views import (
    JobListCreateView,
    JobDetailView,
    PublicJobListView,
    PublicJobDetailView,
)


urlpatterns = [

    # Public / Job seeker APIs
    path("all/", PublicJobListView.as_view(), name="public-jobs"),
    path("details/<int:pk>/", PublicJobDetailView.as_view(), name="public-job-detail"),


    # Recruiter APIs
    path("", JobListCreateView.as_view(), name="job-list-create"),
    path("<int:pk>/", JobDetailView.as_view(), name="job-detail"),

]








# from django.urls import path
# from .views import JobListCreateView, JobDetailView, PublicJobListView,PublicJobDetailView

# urlpatterns = [
#     path("all/", PublicJobListView.as_view(), name="public-jobs"),
#     path("", JobListCreateView.as_view(), name="job-list-create"),
#     path("<int:pk>/", JobDetailView.as_view(), name="job-detail"),
#     path("jobs/<int:pk>/", PublicJobDetailView.as_view()),
# ]
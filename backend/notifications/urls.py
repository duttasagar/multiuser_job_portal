from django.urls import path
from .views import NotificationView,MarkNotificationReadView

urlpatterns = [

    path(
        "",
        NotificationView.as_view()
    ),

     path("<int:pk>/read/", MarkNotificationReadView.as_view()),

]
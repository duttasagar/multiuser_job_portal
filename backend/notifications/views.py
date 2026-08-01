from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


class NotificationView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        notifications = Notification.objects.filter(
            user=request.user
        )

        serializer = NotificationSerializer(
            notifications,
            many=True
        )

        return Response(serializer.data)



class MarkNotificationReadView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            notification = Notification.objects.get(
                id=pk,
                user=request.user
            )

        except Notification.DoesNotExist:
            return Response(
                {"message": "Notification not found"},
                status=404
            )

        notification.is_read = True
        notification.save()

        return Response({
            "message": "Notification marked as read"
        })
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from .models import JobSeekerProfile,RecruiterProfile
from .models import (
    JobSeekerProfile,
    RecruiterProfile
)
from .serializers import JobSeekerProfileSerializer, RecruiterProfileSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    parser_classes = [
            MultiPartParser,
            FormParser
        ]

    def get(self, request):

        try:
            profile = JobSeekerProfile.objects.get(
                user=request.user
            )

        except JobSeekerProfile.DoesNotExist:
            return Response(
                None,
                status=status.HTTP_404_NOT_FOUND
            )


        serializer = JobSeekerProfileSerializer(profile)

        print("========== PROFILE ==========")
        print(serializer.data)
        print("=============================")

        return Response(serializer.data)

    def post(self, request):
        if JobSeekerProfile.objects.filter(user=request.user).exists():
            return Response(
                {
                    "status": False,
                    "message": "Profile already exists."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = JobSeekerProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                full_name=request.user.get_full_name()
            )

            return Response(
                {
                    "status": True,
                    "message": "Profile created successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request):
        try:
            profile = JobSeekerProfile.objects.get(user=request.user)
        except JobSeekerProfile.DoesNotExist:
            return Response(
                {
                    "status": False,
                    "message": "Profile not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = JobSeekerProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "status": True,
                    "message": "Profile updated successfully.",
                    "data": serializer.data
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProfileCompletionView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile = JobSeekerProfile.objects.get(
            user=request.user
        )

        return Response({
            "completion": profile.profile_completion()
        })




class RecruiterProfileView(APIView):

    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser
    ]


    def get(self, request):

        try:
            profile = RecruiterProfile.objects.get(
                user=request.user
            )

        except RecruiterProfile.DoesNotExist:

            return Response(
                status=status.HTTP_404_NOT_FOUND
            )


        serializer = RecruiterProfileSerializer(profile)

        return Response(
            serializer.data
        )



    def post(self, request):

        if RecruiterProfile.objects.filter(
            user=request.user
        ).exists():

            return Response(
                {
                    "message": "Profile already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        serializer = RecruiterProfileSerializer(
            data=request.data
        )


        if serializer.is_valid():

            serializer.save(
                user=request.user
            )


            return Response(
                {
                    "message": "Recruiter profile created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )


        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )




    def put(self, request):
        print("========== PUT REQUEST ==========")
        print(request.data)

        try:

            profile = RecruiterProfile.objects.get(
                user=request.user
            )


        except RecruiterProfile.DoesNotExist:

            return Response(
                {
                    "message": "Profile not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )



        serializer = RecruiterProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )



        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile updated successfully",
                "data": serializer.data
            })

        print(serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
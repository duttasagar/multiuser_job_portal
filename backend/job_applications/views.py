from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job
from .models import JobApplication
from .serializers import JobApplicationSerializer
from rest_framework import status
from profiles.models import JobSeekerProfile
from notifications.models import Notification
class ApplyJobView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request, job_id):

        user = request.user


        # Get job
        try:
            job = Job.objects.get(
                id=job_id
            )

        except Job.DoesNotExist:
            return Response(
                {
                    "message": "Job not found"
                },
                status=404
            )


        # Get user's profile
        try:
            profile = JobSeekerProfile.objects.get(
                user=user
            )

        except JobSeekerProfile.DoesNotExist:
            return Response(
                {
                    "message": "Please complete your profile first"
                },
                status=400
            )


        # Check duplicate application
        if JobApplication.objects.filter(
            job=job,
            user=user
        ).exists():

            return Response(
                {
                    "message": "Already applied"
                },
                status=400
            )


        # Get uploaded CV
        resume = request.FILES.get(
            "resume"
        )


        # Check if the profile has a resume
        if not profile.resume:
            return Response(
                {
                    "message": "Please upload a resume in your profile first"
                },
                status=400
            )

        application = JobApplication.objects.create(
        user=user,
        job=job,
         profile=profile,
        resume=profile.resume
    )

        serializer = JobApplicationSerializer(
            application
        )


        return Response(
            serializer.data,
            status=201
        )


class MyApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        applications = JobApplication.objects.filter(
            user=request.user
        ).select_related(
            "job",
            "job__company",
            "profile"
        )

        serializer = JobApplicationSerializer(
            applications,
            many=True
        )

        return Response(serializer.data)




class RecruiterApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        applications = (
            JobApplication.objects.filter(
                job__company__recruiter=request.user
            )
            .select_related(
                "user",
                "job",
                "job__company",
            )
            .order_by("-applied_at")
        )

        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)



class UpdateApplicationStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            application = JobApplication.objects.get(
                id=pk
            )

        except JobApplication.DoesNotExist:
            return Response(
                {
                    "message": "Application not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        status_value = request.data.get("status")

        if status_value not in [
            "applied",
            "reviewing",
            "shortlisted",
            "rejected"
        ]:
            return Response(
                {
                    "message": "Invalid Status"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = status_value
        application.save()

        Notification.objects.create(
        user=application.user,
        title="Application Status Updated",
        message=f"Your application for '{application.job.title}' has been {application.status.title()}."
)

        return Response(
            {
                "message": "Status Updated Successfully",
                "status": application.status
            }
        )
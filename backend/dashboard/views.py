from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job
from companies.models import Company
from job_applications.models import JobApplication


class RecruiterDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # Companies created by recruiter
        companies = Company.objects.filter(recruiter=request.user)

        # Jobs belonging to recruiter's companies
        jobs = Job.objects.filter(company__recruiter=request.user)

        # Applications for those jobs
        applications = JobApplication.objects.filter(
            job__company__recruiter=request.user
        )

        return Response({
            "stats": {
                "jobs": jobs.count(),
                "companies": companies.count(),
                "applications": applications.count(),
                "shortlisted": applications.filter(
                    status="shortlisted"
                ).count(),
            },

            "recent_jobs": list(
                jobs.order_by("-created_at")
                .values(
                    "id",
                    "title",
                    "location",
                    "created_at"
                )[:5]
            ),

            "recent_applications": list(
                applications
                .order_by("-applied_at")
                .values(
                    "id",
                    "user__username",
                    "job__title",
                    "status",
                    "applied_at"
                )[:5]
            ),
        })
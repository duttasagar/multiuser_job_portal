from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsRecruiter
from .models import Job
from .serializers import JobSerializer
from companies.models import Company
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
class JobListCreateView(APIView):

    permission_classes = [IsAuthenticated, IsRecruiter]
    # Get logged-in recruiter's jobs
    def get(self, request):

        jobs = Job.objects.filter(
            company__recruiter=request.user
        ).order_by("-created_at")

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)


    # Create job for logged-in recruiter's company
    def post(self, request):

            company_id = request.data.get("company")


            try:
                company = Company.objects.get(
                    id=company_id,
                    recruiter=request.user
                )

            except Company.DoesNotExist:
                return Response(
                    {
                        "message": "Invalid company selection"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )


            serializer = JobSerializer(
                data=request.data
            )


            if serializer.is_valid():

                serializer.save(
                    company=company
                )

                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )


            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )



class JobDetailView(APIView):

    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_job(self, pk, user):

        try:
            return Job.objects.get(
                id=pk,
                company__recruiter=user
            )

        except Job.DoesNotExist:
            return None



    def get(self, request, pk):

        job = self.get_job(
            pk,
            request.user
        )

        if not job:
            return Response(
                {
                    "message": "Job not found"
                },
                status=404
            )


        serializer = JobSerializer(job)

        return Response(serializer.data)



    def put(self, request, pk):

        job = self.get_job(
            pk,
            request.user
        )

        if not job:
            return Response(
                {
                    "message": "You cannot edit this job"
                },
                status=403
            )


        serializer = JobSerializer(
            job,
            data=request.data,
            partial=True
        )


        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)


        return Response(
            serializer.errors,
            status=400
        )



    def delete(self, request, pk):

        job = self.get_job(
            pk,
            request.user
        )


        if not job:
            return Response(
                {
                    "message": "You cannot delete this job"
                },
                status=403
            )


        job.delete()


        return Response(
            {
                "message": "Job deleted successfully"
            },
            status=204
        )


class PublicJobListView(APIView):

    permission_classes = [AllowAny]
    def get(self, request):

        print("AUTH HEADER:", request.META.get("HTTP_AUTHORIZATION"))
        print("USER:", request.user)
        print("AUTHENTICATED:", request.user.is_authenticated)

        jobs = Job.objects.select_related("company").all().order_by("-created_at")

        serializer = JobSerializer(jobs, many=True)

        return Response(serializer.data)


class PublicJobDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        job = get_object_or_404(Job, pk=pk)
        serializer = JobSerializer(job)
        return Response(serializer.data)
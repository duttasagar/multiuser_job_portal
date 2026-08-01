from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Company
from .serializers import CompanySerializer
from .permissions import IsRecruiter


class CompanyListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get(self, request):
        companies = Company.objects.filter(recruiter=request.user)
        serializer = CompanySerializer(companies, many=True)

        return Response({
            "status": True,
            "data": serializer.data
        })

    def post(self, request):
        serializer = CompanySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(recruiter=request.user)

            return Response({
                "status": True,
                "message": "Company created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class CompanyDetailView(APIView):
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_object(self, pk, user):
        try:
            return Company.objects.get(pk=pk, recruiter=user)
        except Company.DoesNotExist:
            return None

    def get(self, request, pk):
        company = self.get_object(pk, request.user)

        if not company:
            return Response({
                "status": False,
                "message": "Company not found."
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CompanySerializer(company)

        return Response({
            "status": True,
            "data": serializer.data
        })

    def put(self, request, pk):
        company = self.get_object(pk, request.user)

        if not company:
            return Response({
                "status": False,
                "message": "Company not found."
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CompanySerializer(
            company,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response({
                "status": True,
                "message": "Company updated successfully.",
                "data": serializer.data
            })

        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        company = self.get_object(pk, request.user)

        if not company:
            return Response({
                "status": False,
                "message": "Company not found."
            }, status=status.HTTP_404_NOT_FOUND)

        company.delete()

        return Response({
            "status": True,
            "message": "Company deleted successfully."
        })
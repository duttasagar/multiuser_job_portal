from rest_framework import serializers
from .models import User
from companies.models import Company
from companies.serializers import CompanySerializer


class UserProfileSerializer(serializers.ModelSerializer):
    companies = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "phone",
            "role",
            "is_verified",
            "date_joined",
            "companies",
        ]

    def get_companies(self, obj):
        companies = Company.objects.filter(recruiter=obj)
        return CompanySerializer(companies, many=True).data
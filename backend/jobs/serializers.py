from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(
        source="company.company_name",
        read_only=True
    )

    company_logo = serializers.ImageField(
        source="company.logo",
        read_only=True
    )

    company_location = serializers.CharField(
        source="company.location",
        read_only=True
    )

    company_website = serializers.CharField(
        source="company.website",
        read_only=True
    )

    class Meta:
        model = Job
        fields = "__all__"
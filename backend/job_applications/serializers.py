from rest_framework import serializers
from .models import JobApplication



class JobApplicationSerializer(serializers.ModelSerializer):

    applicant_name = serializers.CharField(source="user.username", read_only=True)

    applicant_email = serializers.EmailField(source="user.email", read_only=True)

    job_title = serializers.CharField(source="job.title", read_only=True)

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True,
    )

    company_logo = serializers.ImageField(
        source="job.company.logo",
        read_only=True,
    )

    company_location = serializers.CharField(
        source="job.company.location",
        read_only=True,
    )

    class Meta:
        model = JobApplication
        fields = "__all__"

# class JobApplicationSerializer(serializers.ModelSerializer):

#     job_title = serializers.CharField(
#         source="job.title",
#         read_only=True
#     )

#     user_email = serializers.EmailField(
#         source="user.email",
#         read_only=True
#     )

#     company_name = serializers.CharField(
#         source="job.company.company_name",
#         read_only=True
#     )

#     company_logo = serializers.ImageField(
#         source="job.company.logo",
#         read_only=True
#     )

#     company_location = serializers.CharField(
#         source="job.company.location",
#         read_only=True
#     )

#     company_website = serializers.URLField(
#         source="job.company.website",
#         read_only=True
#     )

#     company_email = serializers.EmailField(
#         source="job.company.email",
#         read_only=True
#     )

#     company_phone = serializers.CharField(
#         source="job.company.phone",
#         read_only=True
#     )

#     class Meta:
#         model = JobApplication

#         fields = [
#             "id",
#             "job",
#             "job_title",

#             "company_name",
#             "company_logo",
#             "company_location",
#             "company_website",
#             "company_email",
#             "company_phone",

#             "user",
#             "user_email",
#             "resume",
#             "status",
#             "applied_at",
#         ]

#         read_only_fields = [
#             "user",
#             "resume",
#             "status",
#             "applied_at",
#         ]
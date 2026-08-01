from rest_framework import serializers
from .models import JobSeekerProfile
from .models import RecruiterProfile
class JobSeekerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = JobSeekerProfile
        fields = [
            "id",
            "username",
            "email",
            "full_name",
            "phone",
            "address",
            "education",
            "experience",
            "skills",
            "linkedin",
            "github",
            "portfolio",
            "resume",
            "profile_image",
            "created_at",
            "updated_at",
        ]



# class RecruiterProfileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = RecruiterProfile
#         fields = "__all__"
#         read_only_fields = ["user"]


from companies.models import Company


class RecruiterProfileSerializer(serializers.ModelSerializer):

    company_name = serializers.SerializerMethodField()


    class Meta:
        model = RecruiterProfile
        fields = [
            "id",
            "full_name",
            "phone",
            "designation",
            "department",
            "linkedin",
            "profile_image",
            "company_name",
        ]


    def get_company_name(self,obj):

        company = Company.objects.filter(
            recruiter=obj.user
        ).first()

        if company:
            return company.company_name

        return None










# from rest_framework import serializers
# from .models import JobSeekerProfile

# class JobSeekerProfileSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(
#         source="user.username",
#         read_only=True
#     )

#     email = serializers.EmailField(
#         source="user.email",
#         read_only=True
#     )
    
#     full_name = serializers.CharField(
#     source="user.username",
#     read_only=True
# )


#     email = serializers.EmailField(
#         source="user.email",
#     )

#     phone = serializers.CharField(
#         source="user.phone",
#         read_only=True
#     )

#     class Meta:
#         model = JobSeekerProfile
#         fields = [
#             "id",
#             "username",
#             "full_name",
#             "email",
#             "phone",
#             "address",
#             "education",
#             "experience",
#             "skills",
#             "linkedin",
#             "github",
#             "portfolio",
#             "resume",
#              "profile_image",
#             "created_at",
#             "updated_at",
#         ]
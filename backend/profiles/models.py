from django.db import models
from django.conf import settings

class JobSeekerProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    profile_image = models.ImageField(
    upload_to="profile_images/",
    blank=True,
    null=True
)

    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True)

    education = models.TextField()
    experience = models.TextField(blank=True)

    skills = models.TextField(blank=True)

    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name


    def profile_completion(self):
        fields = [
            self.full_name,
            self.phone,
            self.address,
            self.education,
            self.experience,
            self.skills,
            self.resume,
            self.profile_image,
        ]

        completed = sum(bool(field) for field in fields)

        return int((completed / len(fields)) * 100)




class RecruiterProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recruiter_profile"
    )

    profile_image = models.ImageField(
        upload_to="recruiter_profiles/",
        blank=True,
        null=True
    )

    full_name = models.CharField(max_length=150)

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    designation = models.CharField(
        max_length=100,
        blank=True
    )

    department = models.CharField(
        max_length=100,
        blank=True
    )

    linkedin = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
from django.db import models
from accounts.models import User


class Company(models.Model):
    recruiter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "recruiter"},
        related_name="companies"
    )
    company_name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to="companies/", blank=True, null=True)
    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    description = models.TextField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name